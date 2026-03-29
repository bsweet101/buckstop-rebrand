const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'public', 'images');

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const page = await context.newPage();
  await page.goto('https://buckstopscents.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Get ALL images on the page - logos, banners, hero, everything brand-related
  const allImages = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('img').forEach(img => {
      if (img.src && img.naturalWidth > 10) {
        results.push({
          src: img.src,
          alt: img.alt || '',
          width: img.naturalWidth,
          height: img.naturalHeight,
          classes: img.className,
          parent: img.parentElement?.className || '',
        });
      }
    });
    // Also check for CSS background images
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none' && bg.includes('url(')) {
        const match = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (match) {
          results.push({
            src: match[1],
            alt: 'bg-image',
            width: el.offsetWidth,
            height: el.offsetHeight,
            classes: el.className,
            parent: 'background',
          });
        }
      }
    });
    return results;
  });

  console.log(`Found ${allImages.length} images/assets on homepage:\n`);
  allImages.forEach(img => {
    console.log(`  ${img.width}x${img.height} | ${img.alt || img.classes || 'no-alt'} | ${img.src}`);
  });

  // Download logo and key brand assets
  const brandAssets = allImages.filter(img =>
    img.src.includes('logo') ||
    img.src.includes('banner') ||
    img.src.includes('slider') ||
    img.src.includes('header') ||
    img.src.includes('brand') ||
    img.alt.toLowerCase().includes('buck stop') ||
    img.alt.toLowerCase().includes('logo') ||
    (img.width > 200 && img.height > 100) // larger images likely brand/hero
  );

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Brand assets to download: ${brandAssets.length}`);
  console.log('='.repeat(60));

  for (const asset of brandAssets) {
    try {
      const imgBuffer = await page.evaluate(async (src) => {
        const resp = await fetch(src);
        if (!resp.ok) return null;
        const buf = await resp.arrayBuffer();
        return { data: Array.from(new Uint8Array(buf)) };
      }, asset.src);

      if (imgBuffer && imgBuffer.data.length > 500) {
        const urlPath = new URL(asset.src).pathname;
        const ext = path.extname(urlPath) || '.png';
        const basename = path.basename(urlPath, ext)
          .replace(/[^a-z0-9_-]/gi, '-')
          .substring(0, 50);
        const filename = `${basename}${ext}`;
        const filePath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(imgBuffer.data));
        const sizeKB = Math.round(imgBuffer.data.length / 1024);
        console.log(`  Saved: ${filename} (${sizeKB}KB, ${asset.width}x${asset.height})`);
      }
    } catch (err) {
      console.log(`  Failed: ${err.message.substring(0, 60)}`);
    }
  }

  // Also check the slider/hero images specifically
  const heroPage = await context.newPage();
  await heroPage.goto('https://buckstopscents.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await heroPage.waitForTimeout(2000);

  // Get slider/hero/banner images
  const heroImages = await heroPage.evaluate(() => {
    const results = [];
    // Common slider selectors
    const selectors = [
      '.rt-slideshow img', '.slideshow img', '.slider img', '.carousel img',
      '.hero img', '.banner img', '[class*="slide"] img', '[class*="hero"] img',
      '.swiper img', '.slick img', '.owl img',
      // RocketTheme specific
      '.roksprocket img', '.rt-sprocket img',
    ];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach(img => {
        if (img.src) results.push({ src: img.src, alt: img.alt, sel });
      });
    }
    // Also grab any large images
    document.querySelectorAll('img').forEach(img => {
      if (img.naturalWidth > 400 || img.src.includes('slide') || img.src.includes('banner')) {
        results.push({ src: img.src, alt: img.alt || '', sel: 'large' });
      }
    });
    return results;
  });

  console.log(`\nHero/slider images: ${heroImages.length}`);
  const seen = new Set();
  for (const img of heroImages) {
    if (seen.has(img.src)) continue;
    seen.add(img.src);
    console.log(`  ${img.sel}: ${img.src}`);
    try {
      const imgBuffer = await heroPage.evaluate(async (src) => {
        const resp = await fetch(src);
        if (!resp.ok) return null;
        const buf = await resp.arrayBuffer();
        return { data: Array.from(new Uint8Array(buf)) };
      }, img.src);

      if (imgBuffer && imgBuffer.data.length > 1000) {
        const urlPath = new URL(img.src).pathname;
        const ext = path.extname(urlPath) || '.jpg';
        const basename = 'hero-' + path.basename(urlPath, ext)
          .replace(/[^a-z0-9_-]/gi, '-')
          .substring(0, 50);
        const filename = `${basename}${ext}`;
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(imgBuffer.data));
        console.log(`    Saved: ${filename} (${Math.round(imgBuffer.data.length/1024)}KB)`);
      }
    } catch (e) {}
  }

  await heroPage.close();
  await page.close();
  await browser.close();

  console.log('\nDone! Check', OUTPUT_DIR);
})();
