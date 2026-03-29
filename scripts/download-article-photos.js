const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'public', 'images', 'articles');

const photos = [
  { slug: 'rattling', url: 'https://unsplash.com/photos/a-close-up-of-a-deers-head-with-antlers-2hMscH4Hf-I' },
  { slug: 'scrapelines', url: 'https://www.pexels.com/photo/a-trail-in-the-forest-covered-in-leaves-5805272/' },
  { slug: 'scouting', url: 'https://unsplash.com/photos/a-camera-attached-to-a-tree-in-a-forest-FDtugMpcAqo' },
  { slug: 'rut-cycle', url: 'https://unsplash.com/photos/lf6rV2puIS4' },
  { slug: 'scent-elimination', url: 'https://www.pexels.com/photo/man-in-camouflage-soldier-suit-while-holding-black-hunting-rifle-669271/' },
  { slug: 'first-season-checklist', url: 'https://www.pexels.com/photo/man-wearing-gray-and-black-camouflage-jacket-holding-rifle-walking-on-grass-field-2954926/' },
  { slug: 'mistakes', url: 'https://www.pexels.com/photo/forest-road-with-a-hunting-high-seat-in-the-background-16805333/' },
  { slug: 'opening-morning', url: 'https://unsplash.com/photos/misty-forest-at-sunrise-with-sunbeams-breaking-through-ereqI_ei5tA' },
  { slug: 'calls-scents-combo', url: 'https://pixabay.com/photos/red-deer-stag-bellow-brown-hunting-4551687/' },
];

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  let downloaded = 0;

  for (const photo of photos) {
    const page = await context.newPage();
    try {
      console.log(`[${photo.slug}] Loading ${photo.url}`);
      await page.goto(photo.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);

      // Find the main/largest image on the page
      const imgBuffer = await page.evaluate(async () => {
        // Try to find the hero/main image
        let bestImg = null;
        let maxSize = 0;

        const imgs = document.querySelectorAll('img');
        for (const img of imgs) {
          const size = img.naturalWidth * img.naturalHeight;
          if (size > maxSize && img.naturalWidth > 400 && !img.src.includes('avatar') && !img.src.includes('logo') && !img.src.includes('icon') && !img.src.includes('profile')) {
            maxSize = size;
            bestImg = img;
          }
        }

        if (!bestImg) return null;

        // For Unsplash, try to get the higher-res version
        let imgSrc = bestImg.src;
        // Unsplash images often have ?w= params, bump to 1200
        if (imgSrc.includes('unsplash.com') && imgSrc.includes('?')) {
          imgSrc = imgSrc.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800');
        }
        // Pexels images - try to get larger
        if (imgSrc.includes('pexels.com') && imgSrc.includes('?')) {
          imgSrc = imgSrc.replace(/w=\d+/, 'w=1200');
        }

        try {
          const resp = await fetch(imgSrc);
          if (!resp.ok) {
            // Fall back to original src
            const resp2 = await fetch(bestImg.src);
            if (!resp2.ok) return null;
            const buf = await resp2.arrayBuffer();
            return { data: Array.from(new Uint8Array(buf)) };
          }
          const buf = await resp.arrayBuffer();
          return { data: Array.from(new Uint8Array(buf)) };
        } catch (e) {
          return null;
        }
      });

      if (imgBuffer && imgBuffer.data.length > 5000) {
        const filename = `${photo.slug}.jpg`;
        const filePath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(imgBuffer.data));
        const sizeKB = Math.round(imgBuffer.data.length / 1024);
        console.log(`  Saved: ${filename} (${sizeKB}KB)`);
        downloaded++;
      } else {
        console.log(`  No image data or too small`);
      }
    } catch (err) {
      console.log(`  Error: ${err.message.substring(0, 80)}`);
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nDownloaded ${downloaded}/${photos.length} article photos to ${OUTPUT_DIR}`);
})();
