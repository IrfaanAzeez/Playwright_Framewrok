const path = require('path');
const allureCommandline = require('allure-commandline');

function generateAllureReport() {
  const resultsDir = path.resolve('C:\\Reports');
  const reportDir = path.resolve('C:\\Reports\\allure-report');

  console.log(`Generating Allure report from: ${resultsDir}`);

  return new Promise((resolve, reject) => {
    // Call Allure CLI programmatically (no shell)
    const generation = allureCommandline(['generate', resultsDir, '--clean', '-o', reportDir]);

    generation.on('exit', (exitCode) => {
      if (exitCode === 0) {
        console.log('✅ Allure report generated successfully!');
        console.log(`🌐 HTML report location: ${reportDir}`);
        resolve();
      } else {
        reject(new Error('❌ Failed to generate Allure report.'));
      }
    });
  });
}

module.exports = { generateAllureReport };
