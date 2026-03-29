const { chromium } = require('playwright');

const pages = [
  // Contact variations
  { name: 'contact', url: 'https://buckstopscents.com/callisto/contact-us' },
  { name: 'contact2', url: 'https://buckstopscents.com/callisto/contact-buck-stop' },
  { name: 'contact3', url: 'https://buckstopscents.com/index.php/contact' },
  { name: 'contact4', url: 'https://buckstopscents.com/index.php/contact-us' },
  { name: 'contact5', url: 'https://buckstopscents.com/contact-us' },
  // Find a dealer variations
  { name: 'dealer', url: 'https://buckstopscents.com/callisto/find-a-dealer' },
  { name: 'dealer2', url: 'https://buckstopscents.com/callisto/dealer-locator' },
  { name: 'dealer3', url: 'https://buckstopscents.com/callisto/dealers' },
  { name: 'dealer4', url: 'https://buckstopscents.com/dealer-locator' },
  { name: 'dealer5', url: 'https://buckstopscents.com/dealers' },
  { name: 'dealer6', url: 'https://buckstopscents.com/index.php/find-a-dealer' },
  // History variations
  { name: 'history', url: 'https://buckstopscents.com/callisto/history' },
  { name: 'history2', url: 'https://buckstopscents.com/callisto/our-history' },
  { name: 'history3', url: 'https://buckstopscents.com/callisto/about-buck-stop/history' },
  { name: 'history4', url: 'https://buckstopscents.com/index.php/history' },
  { name: 'history5', url: 'https://buckstopscents.com/our-history' },
  // Other potentially interesting pages
  { name: 'products-all', url: 'https://buckstopscents.com/callisto/products' },
  { name: 'hunting-tips-callisto', url: 'https://buckstopscents.com/callisto/hunting-tips' },
  { name: 'testimonials-callisto', url: 'https://buckstopscents.com/callisto/testimonials' },
  { name: 'customer-svc-callisto', url: 'https://buckstopscents.com/callisto/customer-service' },
  { name: 'photos-callisto', url: 'https://buckstopscents.com/callisto/photos' },
  // Sitemap
  { name: 'sitemap', url: 'https://buckstopscents.com/sitemap.xml' },
  { name: 'sitemap2', url: 'https://buckstopscents.com/index.php?option=com_content&view=sitemap' },
  { name: 'robots', url: 'https://buckstopscents.com/robots.txt' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  });

  for (const pg of pages) {
    const page = await context.newPage();
    try {
      const response = await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 15000 });
      const status = response?.status();
      const title = await page.title();
      const hasError = title.includes('404') || title.includes('500') || title === '';

      if (!hasError && status === 200) {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`FOUND: ${pg.name} -> ${pg.url} [${status}]`);
        console.log(`TITLE: ${title}`);
        console.log('='.repeat(80));
        await page.waitForTimeout(2000);

        const bodyText = await page.evaluate(() => {
          const body = document.body;
          const header = document.querySelector('header, #header, .header, .rt-header');
          const footer = document.querySelector('footer, #footer, .footer, .rt-footer');
          const nav = document.querySelector('nav, #nav, .nav, .rt-menu');
          let text = body.innerText;
          if (header) text = text.replace(header.innerText, '');
          if (footer) text = text.replace(footer.innerText, '');
          if (nav) text = text.replace(nav.innerText, '');
          return text.trim().substring(0, 5000);
        });
        console.log(`\n${bodyText}`);

        const images = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('img'))
            .filter(i => i.naturalWidth > 50 && !i.src.includes('logo'))
            .map(i => ({ alt: i.alt || '(no alt)', src: i.src }));
        });
        if (images.length > 0) {
          console.log(`\nIMAGES:`);
          images.forEach(i => console.log(`  - ${i.alt}: ${i.src}`));
        }
      } else {
        console.log(`SKIP: ${pg.name} [${status}] ${title || '(empty)'}`);
      }
    } catch (err) {
      console.log(`ERR: ${pg.name} -> ${err.message.substring(0, 100)}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
})();
