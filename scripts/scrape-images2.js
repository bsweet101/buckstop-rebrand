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
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(filePath); });
    }).on('error', reject);
  });
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  // First get all product detail URLs from the listing page
  const listPage = await context.newPage();
  await listPage.goto('https://buckstopscents.com/products', { waitUntil: 'networkidle', timeout: 30000 });
  await listPage.waitForTimeout(2000);

  const productLinks = await listPage.evaluate(() => {
    const links = [];
    document.querySelectorAll('a[href*="/products/product/"]').forEach(a => {
      if (!links.includes(a.href)) links.push(a.href);
    });
    return links;
  });
  await listPage.close();

  console.log(`Found ${productLinks.length} product detail URLs`);

  const results = [];

  for (let i = 0; i < productLinks.length; i++) {
    const pUrl = productLinks[i];
    const page = await context.newPage();
    try {
      console.log(`[${i+1}/${productLinks.length}] ${pUrl}`);
      await page.goto(pUrl, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(1500);

      // Get the main product image (full size, not thumbnail)
      const imgData = await page.evaluate(() => {
        // Try to find the main product image
        const candidates = [];

        // HikaShop main image
        document.querySelectorAll('.hikashop_main_image_div img, .hikashop_product_image img, .hikashop_product_main_image_subdiv img').forEach(img => {
          if (img.src) candidates.push({ src: img.src, w: img.naturalWidth, h: img.naturalHeight });
        });

        // Any image linked to full size
        document.querySelectorAll('a[href*="upload/"] img, a[href*="com_hikashop"] img').forEach(img => {
          // The parent <a> might have the full-size URL
          const parent = img.closest('a');
          if (parent && parent.href && parent.href.match(/\.(jpg|jpeg|png|gif|webp)/i)) {
            candidates.push({ src: parent.href, w: 999, h: 999, fromLink: true });
          }
          if (img.src) candidates.push({ src: img.src, w: img.naturalWidth, h: img.naturalHeight });
        });

        // Try to find full-size image URL by removing thumbnail path
        document.querySelectorAll('img[src*="com_hikashop"]').forEach(img => {
          // Convert thumbnail URL to full-size
          // Thumbnail: /thumbnails/100x100f/filename.jpg
          // Full: /upload/filename.jpg
          const fullSrc = img.src.replace(/\/thumbnails\/\d+x\d+\w?\//, '/');
          if (fullSrc !== img.src) {
            candidates.push({ src: fullSrc, w: 1000, h: 1000, converted: true });
          }
          candidates.push({ src: img.src, w: img.naturalWidth, h: img.naturalHeight });
        });

        // Get product name
        const nameEl = document.querySelector('.hikashop_product_name, h1, .product-name');
        const name = nameEl ? nameEl.textContent.trim() : '';

        // Pick the best image (largest or converted full-size)
        candidates.sort((a, b) => (b.w * b.h) - (a.w * a.h));
        const best = candidates.find(c => c.converted) || candidates[0];

        return { name, image: best || null, allCandidates: candidates.slice(0, 5) };
      });

      if (imgData.image) {
        const slug = pUrl.split('/').pop().replace(/^\d+-/, '');
        console.log(`  ${imgData.name || slug}: ${imgData.image.src} (${imgData.image.w}x${imgData.image.h})`);
        results.push({
          name: imgData.name || slug,
          slug: slug,
          src: imgData.image.src,
          productUrl: pUrl,
        });
      } else {
        console.log(`  No image found`);
      }
    } catch (err) {
      console.log(`  Error: ${err.message.substring(0, 60)}`);
    }
    await page.close();
  }

  await browser.close();

  // Deduplicate
  const unique = [];
  const seen = new Set();
  for (const r of results) {
    if (!seen.has(r.src)) {
      seen.add(r.src);
      unique.push(r);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Unique product images: ${unique.length}`);
  console.log('='.repeat(60));

  // Download
  let downloaded = 0;
  for (const img of unique) {
    try {
      const ext = path.extname(new URL(img.src).pathname) || '.jpg';
      const filename = img.slug.substring(0, 60) + ext;
      console.log(`Downloading: ${filename}`);
      await downloadImage(img.src, filename);
      img.localFile = `/images/products/${filename}`;
      downloaded++;
    } catch (err) {
      console.log(`  Failed: ${err.message}`);
    }
  }

  console.log(`\nDownloaded ${downloaded}/${unique.length} images`);

  // Save mapping
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_image-map.json'),
    JSON.stringify(unique, null, 2)
  );
  console.log('Mapping saved to _image-map.json');
})();
