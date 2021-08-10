import puppeteer, { Browser, Page } from 'puppeteer';
import { IncomingWebhook } from '@slack/webhook';
const fs = require('fs').promises;

(async () => {
  const contentConfig = await fs.readFile('config.json', 'utf8');
  const config = JSON.parse(contentConfig);

  let contentLastUsernames: any;
  let lastUsernams: string[];
  try {
    contentLastUsernames = await fs.readFile('usernames.json', 'utf8');
    lastUsernams = JSON.parse(contentLastUsernames);
  } catch {
    lastUsernams = [];
  }

  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page: Page = await browser.newPage();
  await page.goto(
    `https://dash.townshiptale.com/auth/login-page?redirect=/servers/${config.serverID}`
  );
  await page.type('#username', config.username);
  await page.type('#password', config.password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const usernames = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      '#root > div > div > div > div > div > div > div > div > div > div > div > div.MuiCardHeader-content > span.MuiTypography-root.MuiCardHeader-title.MuiTypography-body2.MuiTypography-displayBlock'
    );
    return Array.from(nodes).map((e: any) => e.innerText);
  });
  await fs.writeFile('usernames.json', JSON.stringify(usernames));

  if (usernames.length != lastUsernams.length) {
    let join: string[] = [];
    let left: string[] = [];

    usernames.forEach((u) => {
      if (!lastUsernams.includes(u)) {
        join.push(u);
      }
    });

    lastUsernams.forEach((u) => {
      if (!usernames.includes(u)) {
        left.push(u);
      }
    });

    let message = '';
    if (join.length > 0) {
      message += 'Join to server: ' + join.join(', ') + '\n';
    }

    if (left.length > 0) {
      message += 'Left from server: ' + left.join(', ') + '\n';
    }

    if (join.length + left.length > 0) {
      message +=
        `Current members(${usernames.length}): ` + usernames.join(', ');
      console.log('[INFO] === POST MESSAGE START ===');
      console.log(message);
      console.log('[INFO] === POST MESSAGE END ===');
      const webhook = new IncomingWebhook(config.webhookURL);
      await webhook.send({
        text: message,
      });
    } else {
      console.log("[INFO] The members didn't change.");
    }
  }
  // await page.screenshot({ path: 'debug.png' }); // for debug
  await browser.close();
  console.log('[INFO] Finished.');
})();
