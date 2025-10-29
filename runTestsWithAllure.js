const { spawnSync } = require('child_process');
const { generateAllureReport } = require('./src/utils/reporter');

function runTests() {
  console.log('🟢 Running Cucumber tests...');
  const result = spawnSync('npx', ['cucumber-js'], { stdio: 'inherit', shell: true });

  if (result.error || result.status !== 0) {
    console.error('❌ Cucumber tests failed');
    process.exit(1);
  }
}

async function main() {
  runTests();

  console.log('🟢 Generating Allure report...');
  try {
    await generateAllureReport();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();
