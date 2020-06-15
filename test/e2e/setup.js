// setup.js
const fs = require('fs');
const path = require('path');

const tcbjs = fs.readFileSync(path.resolve(__dirname,'../../cdnjs_e2e/cloudbase.full.js'), 'utf-8');

const browser = global.__BROWSER__;

jest.setTimeout(10000); // 10 second

async function setup() {
  const page = await browser.newPage();
  global.page = page;
  await page.goto('http://127.0.0.1:8000', {waitUntil: 'load'});
  await page.addScriptTag({
    content: tcbjs
  });
}

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  const { page } = global;
  await page.evaluate(() => {
    localStorage.clear();
  });
  page.close();
});
