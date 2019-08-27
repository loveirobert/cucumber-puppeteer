// Dependencies
const pages = require('./pages');
const selectors = require('./selectors');
const scope = require('./scope');

// Defines whether puppeteer runs Chrome in headless mode.
let headless = false;
let slowMo = 0;

const pending = callback => {
  callback(null, 'pending');
};

const waitForElement = async element => {
  const { currentPage } = scope.context;
  console.log({ element });
  return await currentPage.waitForSelector(selectors.uiElements[element]);
};

const visitHomepage = async () => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({ headless, slowMo });
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  const url = scope.host + pages.home;
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2',
  });
  return visit;
};

const pressButton = async button => {
  const { currentPage } = scope.context;
  return await currentPage.click(selectors.buttons[button]);
};

const takenToPage = async pageName => {
  const url = scope.host + pages[pageName];
  const urlMatched = scope.context.currentPage.waitForFunction(
    `window.location.href === '${url}'`,
    { mutation: true }
  );
  await urlMatched;
};

const fillInFormField = async (field, value) => {
  const { currentPage } = scope.context;
  const fieldPresent = await currentPage.waitForSelector(
    `${selectors.inputs[field]}`
  );
  await fieldPresent;
  await currentPage.focus(`${selectors.inputs[field]}`);
  await currentPage.type(`${selectors.inputs[field]}`, value, { delay: 200 });
  return;
};

const shouldBeOnPage = async pageName => {
  const url = scope.host + pages[pageName];
  const urlMatched = scope.context.currentPage.waitForFunction(
    `window.location.href === '${url}'`,
    { mutation: true }
  );
  await urlMatched;
};

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

const shouldSeeText = async text => {
  await delay(100);
  const { currentPage } = scope.context;
  const content = await currentPage.content();
  if (!content.includes(text))
    throw new Error(
      `Expected page to contain text: ${text}, but page contains only: ${content}`
    );
};

const shouldNotSeeText = async text => {
  await delay(100);
  const { currentPage } = scope.context;
  const content = await currentPage.content();
  if (content.includes(text))
    throw new Error(
      `Expected page to not contain text: ${text}, but page contains: ${content}`
    );
};

const wait = async timeInSeconds => {
  const time = parseInt(timeInSeconds) * 1000;
  await delay(time);
};

module.exports = {
  pending,
  headless,
  visitHomepage,
  takenToPage,
  fillInFormField,
  pressButton,
  shouldBeOnPage,
  shouldSeeText,
  shouldNotSeeText,
  wait,
  delay,
  waitForElement,
};
