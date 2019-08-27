const { After, AfterAll, setDefaultTimeout } = require('cucumber');
const scope = require('./support/scope');
const { delay } = require('./support/actions');

setDefaultTimeout(40 * 1000);

After(async () => {
  if (scope.browser && scope.browser.currentPage) {
    const cookies = scope.browser.currentPage.cookies();
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies);
    }
    await scope.context.currentPage.close();
    scope.context.currentPage = null;
  }
});

AfterAll(async () => {
  if (scope.browser) {
    await delay(10000);
    await scope.browser.close();
  }
});
