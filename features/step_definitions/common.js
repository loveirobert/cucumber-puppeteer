const { Given, Then, When } = require('cucumber');
const {
  visitHomepage,
  pressButton,
  waitForElement,
} = require('../support/actions');

Given('I am on the homepage', visitHomepage);
When('I click on the {string} button', pressButton);
Then('the {string} ui element should appear', waitForElement);
