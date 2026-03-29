const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'public', 'images', 'articles');

// Missing: scrapelines, scent-elimination, first-season-checklist, mistakes
// Try Unsplash alternatives since Pexels timed out
const photos = [
  { slug: 'scrapelines', url: 'https://unsplash.com/photos/brown-deer-on-brown-grass-field-during-daytime-SzU3MthQjRk' },
  { slug: 'scent-elimination', url: 'https://unsplash.com/photos/person-holding-black-dslr-camera-Y4fKN-RlMV4' },
  { slug: 'first-season-checklist', url: 'https://unsplash.com/photos/a-backpack-and-other-items-laid-out-on-a-table-QpsaKaEt2to' },
  { slug: 'mistakes', url: 'https://unsplash.com/photos/green-trees-under-white-sky-during-daytime-RrhhzitYizg' },
];

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  let downloaded = 0;

  for (const photo of photos) {
    // Skip if already downloaded
    if (fs.existsSync(path.join(OUTPUT_DIR, `${photo.slug}.jpg`))) {
      console.log(`[${photo.slug}] Already exists, skipping`);
      continue;
    }

    const page = await context.newPage();
    try {
      console.log(`[${photo.slug}] Loading ${photo.url}`);
      await page.goto(photo.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(3000);

      const imgBuffer = await page.evaluate(async () => {
        let bestImg = null;
        let maxSize = 0;
        document.querySelectorAll('img').forEach(img => {
          const size = img.naturalWidth * img.naturalHeight;
          if (size > maxSize && img.naturalWidth > 300 && !img.src.includes('avatar') && !img.src.includes('logo') && !img.src.includes('icon') && !img.src.includes('profile') && !img.src.includes('plus')) {
            maxSize = size;
            bestImg = img;
          }
        });
        if (!bestImg) return null;
        let src = bestImg.src;
        if (src.includes('unsplash.com')) {
          src = src.replace(/w=\d+/, 'w=1200');
        }
        try {
          const resp = await fetch(src);
          if (!resp.ok) return null;
          const buf = await resp.arrayBuffer();
          return { data: Array.from(new Uint8Array(buf)) };
        } catch { return null; }
      });

      if (imgBuffer && imgBuffer.data.length > 5000) {
        const filename = `${photo.slug}.jpg`;
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(imgBuffer.data));
        console.log(`  Saved: ${filename} (${Math.round(imgBuffer.data.length/1024)}KB)`);
        downloaded++;
      } else {
        console.log(`  No image data`);
      }
    } catch (err) {
      console.log(`  Error: ${err.message.substring(0, 80)}`);
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nDownloaded ${downloaded} additional photos`);
  console.log('Total article photos:', fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.jpg')).length);
})();
