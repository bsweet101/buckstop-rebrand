const { chromium } = require('playwright');

const pages = [
  { name: 'about', url: 'https://buckstopscents.com/about-buck-stop' },
  { name: 'about-index', url: 'https://buckstopscents.com/index.php/about-buck-stop' },
  { name: 'about-callisto', url: 'https://buckstopscents.com/callisto/about-buck-stop' },
  { name: 'faq', url: 'https://buckstopscents.com/faq' },
  { name: 'faq-index', url: 'https://buckstopscents.com/index.php/faq' },
  { name: 'faq-callisto', url: 'https://buckstopscents.com/callisto/faq' },
  { name: 'scent-usage-callisto', url: 'https://buckstopscents.com/callisto/scent-usage' },
  { name: 'scent-usage-index', url: 'https://buckstopscents.com/index.php/scent-usage' },
  { name: 'find-dealer-callisto', url: 'https://buckstopscents.com/callisto/find-a-dealer' },
  { name: 'contact-callisto', url: 'https://buckstopscents.com/callisto/contact' },
  { name: 'contact-index', url: 'https://buckstopscents.com/index.php/contact' },
  { name: 'history-callisto', url: 'https://buckstopscents.com/callisto/history' },
  { name: 'history-index', url: 'https://buckstopscents.com/index.php/history' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  });

  for (const pg of pages) {
    const page = await context.newPage();
    try {
      const response = await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 20000 });
      const status = response?.status();
      const title = await page.title();

      // Quick check if it's a real page or error
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
        console.log(`SKIP: ${pg.name} -> [${status}] ${title}`);
      }
    } catch (err) {
      console.log(`ERR: ${pg.name} -> ${err.message.substring(0, 80)}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
})();
