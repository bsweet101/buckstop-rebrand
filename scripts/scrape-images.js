const { chromium } = require('playwright');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'public', 'images', 'products');

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const filePath = path.join(OUTPUT_DIR, filename);
    const file = fs.createWriteStream(filePath);
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(filePath); });
    }).on('error', (err) => { fs.unlink(filePath, () => {}); reject(err); });
  });
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const allImages = [];

  // Scrape all 6 pages of products
  for (let page_num = 1; page_num <= 6; page_num++) {
    const page = await context.newPage();
    const url = page_num === 1
      ? 'https://buckstopscents.com/products'
      : `https://buckstopscents.com/products?page=${page_num}`;

    console.log(`\nScraping page ${page_num}: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const images = await page.evaluate(() => {
        const results = [];
        // Look for product images - try various selectors
        const productCards = document.querySelectorAll('.product-card, .product-item, .product, [class*="product"], .hikashop_product');

        if (productCards.length > 0) {
          productCards.forEach(card => {
            const img = card.querySelector('img');
            const nameEl = card.querySelector('h2, h3, h4, .product-name, .hikashop_product_name, a[href*="product"]');
            if (img && img.src && !img.src.includes('logo')) {
              results.push({
                src: img.src,
                alt: img.alt || '',
                name: nameEl ? nameEl.textContent.trim() : img.alt || 'unknown',
              });
            }
          });
        }

        // Fallback: grab all images that look like product images
        if (results.length === 0) {
          document.querySelectorAll('img').forEach(img => {
            if (img.src &&
                img.naturalWidth > 80 &&
                !img.src.includes('logo') &&
                !img.src.includes('sprite') &&
                !img.src.includes('icon') &&
                !img.src.includes('banner') &&
                !img.src.includes('bbb')) {
              results.push({
                src: img.src,
                alt: img.alt || '',
                name: img.alt || 'unknown',
              });
            }
          });
        }
        return results;
      });

      console.log(`  Found ${images.length} product images`);
      images.forEach(img => {
        console.log(`  - ${img.name}: ${img.src}`);
        allImages.push(img);
      });
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
    await page.close();
  }

  // Also try individual product pages for higher-res images
  const productPage = await context.newPage();
  try {
    await productPage.goto('https://buckstopscents.com/products', { waitUntil: 'networkidle', timeout: 30000 });
    await productPage.waitForTimeout(2000);

    // Get all product detail URLs
    const productUrls = await productPage.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href*="/products/product/"]'))
        .map(a => a.href)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 25); // First 25 products
    });
    console.log(`\nFound ${productUrls.length} product detail URLs`);

    for (const pUrl of productUrls) {
      const detailPage = await context.newPage();
      try {
        await detailPage.goto(pUrl, { waitUntil: 'networkidle', timeout: 15000 });
        await detailPage.waitForTimeout(1000);

        const detailImg = await detailPage.evaluate(() => {
          // Look for main product image
          const selectors = [
            '.hikashop_product_image img',
            '.product-image img',
            '.main-image img',
            '#product-image img',
            '.hikashop_main_image_div img',
            'img[class*="product"]',
          ];
          for (const sel of selectors) {
            const img = document.querySelector(sel);
            if (img && img.src && img.naturalWidth > 100) {
              return { src: img.src, alt: img.alt || '' };
            }
          }
          // Fallback: largest image on page
          let biggest = null;
          let maxSize = 0;
          document.querySelectorAll('img').forEach(img => {
            const size = img.naturalWidth * img.naturalHeight;
            if (size > maxSize && !img.src.includes('logo') && img.naturalWidth > 100) {
              maxSize = size;
              biggest = { src: img.src, alt: img.alt || '' };
            }
          });
          return biggest;
        });

        if (detailImg) {
          const existing = allImages.find(i => i.src === detailImg.src);
          if (!existing) {
            const productName = pUrl.split('/').pop().replace(/^\d+-/, '');
            allImages.push({ ...detailImg, name: productName, fromDetail: true });
            console.log(`  Detail: ${productName} -> ${detailImg.src}`);
          }
        }
      } catch (e) {
        // skip
      }
      await detailPage.close();
    }
  } catch (err) {
    console.log(`Error getting product URLs: ${err.message}`);
  }
  await productPage.close();

  await browser.close();

  // Deduplicate by src
  const unique = [];
  const seen = new Set();
  for (const img of allImages) {
    if (!seen.has(img.src)) {
      seen.add(img.src);
      unique.push(img);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total unique images found: ${unique.length}`);
  console.log('='.repeat(60));

  // Download all images
  let downloaded = 0;
  for (const img of unique) {
    try {
      // Create a clean filename from the product name
      const cleanName = (img.name || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60);

      const ext = path.extname(new URL(img.src).pathname) || '.jpg';
      const filename = `${cleanName}${ext}`;

      console.log(`Downloading: ${filename} from ${img.src}`);
      await downloadImage(img.src, filename);
      downloaded++;
      img.localFile = filename;
    } catch (err) {
      console.log(`  Failed: ${err.message}`);
    }
  }

  console.log(`\nDownloaded ${downloaded}/${unique.length} images to ${OUTPUT_DIR}`);

  // Save mapping file
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_image-map.json'),
    JSON.stringify(unique.map(i => ({ name: i.name, src: i.src, localFile: i.localFile })), null, 2)
  );
  console.log('Image map saved to _image-map.json');
})();
