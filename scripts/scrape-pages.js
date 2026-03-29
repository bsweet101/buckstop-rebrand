const { chromium } = require('playwright');

const pages = [
  { name: 'about', url: 'https://buckstopscents.com/about-buck-stop' },
  { name: 'history', url: 'https://buckstopscents.com/history' },
  { name: 'faq', url: 'https://buckstopscents.com/faq' },
  { name: 'scent-usage', url: 'https://buckstopscents.com/scent-usage' },
  { name: 'find-a-dealer', url: 'https://buckstopscents.com/find-a-dealer' },
  { name: 'contact', url: 'https://buckstopscents.com/contact' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  });

  for (const pg of pages) {
    const page = await context.newPage();
    try {
      console.log(`\n${'='.repeat(80)}`);
      console.log(`PAGE: ${pg.name} (${pg.url})`);
      console.log('='.repeat(80));

      await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait a bit for JS rendering
      await page.waitForTimeout(3000);

      // Get the page title
      const title = await page.title();
      console.log(`TITLE: ${title}`);

      // Get HTTP status from the response
      const response = await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
      console.log(`HTTP STATUS: ${response?.status()}`);
      await page.waitForTimeout(2000);

      // Get all visible text from the main content area
      const bodyText = await page.evaluate(() => {
        // Try common content selectors
        const selectors = [
          'main', '#main', '.main-content', '#content', '.content',
          '.page-content', '#page-content', 'article', '.entry-content',
          '#maincontent', '.main'
        ];

        for (const sel of selectors) {
          const el = document.querySelector(sel);
          if (el && el.innerText.trim().length > 50) {
            return `[SELECTOR: ${sel}]\n${el.innerText.trim()}`;
          }
        }

        // Fallback: get body text minus header/footer
        const body = document.body;
        const header = document.querySelector('header, #header, .header');
        const footer = document.querySelector('footer, #footer, .footer');
        const nav = document.querySelector('nav, #nav, .nav');

        let text = body.innerText;
        if (header) text = text.replace(header.innerText, '');
        if (footer) text = text.replace(footer.innerText, '');
        if (nav) text = text.replace(nav.innerText, '');

        return `[SELECTOR: body minus header/footer/nav]\n${text.trim()}`;
      });

      console.log(`\nCONTENT:\n${bodyText}`);

      // Get all images with alt text
      const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || '(no alt)',
          width: img.naturalWidth,
          height: img.naturalHeight
        })).filter(i => i.width > 50);
      });

      if (images.length > 0) {
        console.log(`\nIMAGES (${images.length}):`);
        images.forEach(img => console.log(`  - ${img.alt}: ${img.src}`));
      }

    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n\nDONE');
})();
