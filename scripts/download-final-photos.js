const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'public', 'images', 'articles');

const photos = [
  { slug: 'scrapelines', url: 'https://unsplash.com/photos/a-deer-standing-in-a-field-of-tall-grass-w1p06UKmhBw' },
  { slug: 'first-season-checklist', url: 'https://unsplash.com/photos/man-in-green-and-brown-camouflage-jacket-and-pants-holding-rifle-8MbdD0pHXGY' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' });

  for (const photo of photos) {
    if (fs.existsSync(path.join(OUTPUT_DIR, `${photo.slug}.jpg`))) { console.log(`Skip ${photo.slug}`); continue; }
    const page = await context.newPage();
    try {
      console.log(`[${photo.slug}] ${photo.url}`);
      await page.goto(photo.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(4000);
      const buf = await page.evaluate(async () => {
        let best = null, max = 0;
        document.querySelectorAll('img').forEach(i => {
          const s = i.naturalWidth * i.naturalHeight;
          if (s > max && i.naturalWidth > 200 && !i.src.includes('avatar') && !i.src.includes('logo') && !i.src.includes('profile')) { max = s; best = i; }
        });
        if (!best) return null;
        let src = best.src.replace(/w=\d+/, 'w=1200');
        try { const r = await fetch(src); if (!r.ok) return null; const b = await r.arrayBuffer(); return Array.from(new Uint8Array(b)); } catch { return null; }
      });
      if (buf && buf.length > 5000) {
        fs.writeFileSync(path.join(OUTPUT_DIR, `${photo.slug}.jpg`), Buffer.from(buf));
        console.log(`  Saved (${Math.round(buf.length/1024)}KB)`);
      } else { console.log('  No data'); }
    } catch (e) { console.log(`  Error: ${e.message.substring(0,60)}`); }
    await page.close();
  }
  await browser.close();
  console.log('Total:', fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.jpg')).length, 'photos');
})();
