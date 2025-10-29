const { AllureRuntime, Status } = require('allure-js-commons');
const { Formatter } = require('@cucumber/cucumber');

class AllureReporter extends Formatter {
  constructor(options) {
    super(options);

    const runtime = new AllureRuntime({
      resultsDir: './reports/allure-results'
    });

    let currentTest = null;

    options.eventBroadcaster.on('test-case-started', event => {
      currentTest = runtime.startTest(event.sourceLocation.uri + ':' + event.sourceLocation.line);
    });

    options.eventBroadcaster.on('test-step-finished', event => {
      if (!currentTest) return;
      const { result, index } = event;
      currentTest.step({
        name: `Step ${index + 1}`,
        status: result.status === 'PASSED' ? Status.PASSED : Status.FAILED
      });
    });

    options.eventBroadcaster.on('test-case-finished', event => {
      if (!currentTest) return;
      const { result } = event;
      currentTest.status = result.status === 'PASSED' ? Status.PASSED : Status.FAILED;
      currentTest.endTest();
      currentTest = null;
    });
  }
}

module.exports = AllureReporter;
