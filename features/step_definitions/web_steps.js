const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { expect } = require('expect');

When('I press the {string} button', async function (buttonName) {
  const buttonId = `${buttonName.toLowerCase()}-btn`;
  const button = await this.driver.findElement(By.id(buttonId));
  await button.click();
});

Then('I should see {string} in the results', async function (text) {
  const searchResults = await this.driver.wait(
    until.elementLocated(By.id('search_results')),
    10000
  );
  await this.driver.wait(until.elementIsVisible(searchResults), 10000);
  const content = await searchResults.getText();
  expect(content).toContain(text);
});

Then('I should not see {string} in the results', async function (text) {
  const searchResults = await this.driver.wait(
    until.elementLocated(By.id('search_results')),
    10000
  );
  const content = await searchResults.getText();
  expect(content).not.toContain(text);
});

Then('I should see the message {string}', async function (message) {
  const flashMessage = await this.driver.wait(
    until.elementLocated(By.id('flash_message')),
    10000
  );
  await this.driver.wait(until.elementIsVisible(flashMessage), 10000);
  const content = await flashMessage.getText();
  expect(content).toContain(message);
});
