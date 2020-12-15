// setup.js
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');

const serveStatic = require('serve-static');
const express = require('express');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download('686378');
  const browser = await puppeteer.launch({
    // headless: false
    executablePath: revisionInfo.executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());

  const app = express();
  app.use(serveStatic('.'));
  const server = app.listen(8000);
  global.__SERVER__ = server;
};
