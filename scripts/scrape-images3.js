const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'public', 'images', 'products');

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  });

  // Product detail URLs (only real ones, skip updatecart links)
  const productUrls = [
    { slug: 'mate-triks-original', url: 'https://buckstopscents.com/products/product/1-mate-triks-original-doe-in-heat-1-1-4-oz' },
    { slug: 'mate-triks-spray', url: 'https://buckstopscents.com/products/product/2-mate-triks-spray-original-doe-in-heat-2-oz' },
    { slug: 'mate-triks-pro', url: 'https://buckstopscents.com/products/product/3-mate-triks-pro-size-original-doe-in-heat-4-oz' },
    { slug: '200-proof', url: 'https://buckstopscents.com/products/product/4-200-proof-ultimate-doe-in-heat-2-oz' },
    { slug: 'x-cel', url: 'https://buckstopscents.com/products/product/5-x-cel-fresh-estrus-buck-lure-1-1-4-oz' },
    { slug: 'the-peak', url: 'https://buckstopscents.com/products/product/6-the-peak-premium-doe-in-heat-2-oz' },
    { slug: 'ruckn-buck', url: 'https://buckstopscents.com/products/product/7-ruck-n-buck-dominant-buck-urine-2-oz' },
    { slug: 'five', url: 'https://buckstopscents.com/products/product/9-five-2-oz' },
    { slug: 'alure', url: 'https://buckstopscents.com/products/product/10-alure-1-1-4-oz' },
    { slug: 'buc-plus', url: 'https://buckstopscents.com/products/product/11-buc-plus-1-1-4-oz' },
    { slug: 'supreme-buck', url: 'https://buckstopscents.com/products/product/12-supreme-buck-urine-1-1-4-oz' },
    { slug: 'gland-u-lure', url: 'https://buckstopscents.com/products/product/13-gland-u-lure-1-1-4-oz' },
    { slug: 'gland-u-lure-spray', url: 'https://buckstopscents.com/products/product/14-gland-u-lure-spray-2-oz' },
    { slug: 'gland-u-lure-tr', url: 'https://buckstopscents.com/products/product/15-gland-u-lure-tr-2-oz' },
    { slug: 'gland-u-lure-pro', url: 'https://buckstopscents.com/products/product/16-gland-u-lure-pro-size-4-oz' },
    { slug: 'bag-a-buck', url: 'https://buckstopscents.com/products/product/17-bag-a-buck' },
    { slug: 'buck-beads-mate-triks', url: 'https://buckstopscents.com/products/product/26-mate-triks-buck-beads-5-3-4oz' },
    { slug: 'buck-beads-sweet-corn', url: 'https://buckstopscents.com/products/product/28-sweet-corn-buck-beads-5-3-4oz' },
    { slug: 'buck-beads-gland-u-lure', url: 'https://buckstopscents.com/products/product/31-gland-u-lure-buck-beads-5-3-4oz' },
    { slug: 'buck-beads-sugar-beet', url: 'https://buckstopscents.com/products/product/33-sugar-beet-buck-beads-5-3-4oz' },
    { slug: 'guide-grade', url: 'https://buckstopscents.com/products/product/44-guide-grade-scents-doe-in-heat-2-oz' },
  ];

  let downloaded = 0;

  for (const product of productUrls) {
    const page = await context.newPage();
    try {
      console.log(`[${downloaded+1}/${productUrls.length}] ${product.slug}`);
      await page.goto(product.url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(1500);

      // Find the product image and download it via the browser's fetch
      const imgBuffer = await page.evaluate(async () => {
        // Find the main product image
        const imgs = document.querySelectorAll('img[src*="com_hikashop"]');
        let bestImg = null;
        let maxSize = 0;

        imgs.forEach(img => {
          const size = img.naturalWidth * img.naturalHeight;
          if (size > maxSize) {
            maxSize = size;
            bestImg = img;
          }
        });

        if (!bestImg) return null;

        // Convert thumbnail URL to full URL
        let imgSrc = bestImg.src.replace(/\/thumbnails\/\d+x\d+\w?\//, '/');

        // Fetch the image via the browser (has cookies/referrer)
        try {
          const resp = await fetch(imgSrc);
          if (!resp.ok) {
            // Try original src if converted URL fails
            const resp2 = await fetch(bestImg.src);
            if (!resp2.ok) return null;
            const buf = await resp2.arrayBuffer();
            return { data: Array.from(new Uint8Array(buf)), ext: bestImg.src.match(/\.(jpg|jpeg|png|gif|webp)/i)?.[0] || '.jpg' };
          }
          const buf = await resp.arrayBuffer();
          return { data: Array.from(new Uint8Array(buf)), ext: imgSrc.match(/\.(jpg|jpeg|png|gif|webp)/i)?.[0] || '.jpg' };
        } catch (e) {
          return null;
        }
      });

      if (imgBuffer && imgBuffer.data.length > 1000) {
        const filename = `${product.slug}${imgBuffer.ext}`;
        const filePath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(imgBuffer.data));
        const sizeKB = Math.round(imgBuffer.data.length / 1024);
        console.log(`  Saved: ${filename} (${sizeKB}KB)`);
        downloaded++;
      } else {
        console.log(`  No image data`);
      }
    } catch (err) {
      console.log(`  Error: ${err.message.substring(0, 60)}`);
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nDownloaded ${downloaded}/${productUrls.length} product images to ${OUTPUT_DIR}`);
})();
