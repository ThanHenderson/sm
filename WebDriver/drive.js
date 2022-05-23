const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// For Matt: Set geckodriver.
const serviceBuilder = new firefox.ServiceBuilder('/Users/than/Development/sm/mozilla-unified/obj-optdebug-browser-gecko-aarch64-apple-darwin21.5.0/dist/bin/geckodriver');

let options = new firefox.Options();
// For Matt: Set browser binary.
options.setBinary('/Users/than/Development/sm/mozilla-unified/obj-optdebug-browser-gecko-aarch64-apple-darwin21.5.0/dist/NightlyDebug.app/Contents/MacOS/firefox');
options.addArguments('--headless');
(async function() {
 let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxService(serviceBuilder)
    .setFirefoxOptions(options)
    .build();
  try {
    switch (process.argv[2]) {
      case 'speedometer':
        await driver.get('https://browserbench.org/Speedometer2.0/InteractiveRunner.html');
        await driver.findElement(By.id('runSuites')).click();
        await driver.wait(until.elementLocated(By.tagName('pre')));
        break;
      case 'jetstream':
        await driver.get('https://browserbench.org/JetStream/');
        await driver.wait(until.elementLocated(By.linkText('Start Test')));
        await driver.findElement(By.linkText('Start Test')).click();
        await driver.wait(until.elementLocated(By.className('done')));
        break;
      default:
        console.log('No benchmark supplied.')
    }
  } finally {
    await driver.close();
  }

})();
 
