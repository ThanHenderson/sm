const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const jetStreamPath = '/Users/sor-lab-02/Desktop/sm/sm/JetStream2';
const objPath = '/Users/sor-lab-02/Desktop/sm/mozilla-unified/obj-optdebug-browser-gecko-aarch64-apple-darwin21.2.0'
const builder = objPath + '/dist/bin/geckodriver';
const binary = objPath + '/dist/NightlyDebug.app/Contents/MacOS/firefox';

const serviceBuilder = new firefox.ServiceBuilder(builder);
let options = new firefox.Options();
options.setBinary(binary);
// options.addArguments('--headless');

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
        let testName = process.argv[3];
        if (!testName) {
          testName = 'default';
        } 

        console.log('running jetstream test: ' + testName);
        await driver.get(`file://${jetStreamPath}/index.html`);
        await driver.switchTo().alert().sendKeys(testName);
        await driver.switchTo().alert().accept();
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
