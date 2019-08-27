const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');

const World = function() {
  scope.host = 'https://www.bondora.com';
  scope.driver = puppeteer;
  scope.context = {};
};

setWorldConstructor(World);
