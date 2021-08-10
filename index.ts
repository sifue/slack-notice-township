import puppeteer, { Browser } from 'puppeteer';
const fs = require('fs').promises(async () => {
  const content = await fs.readFile('config.json', 'utf8');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
