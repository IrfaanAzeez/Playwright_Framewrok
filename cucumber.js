module.exports = {
  default: {
    require: [
  './src/steps/**/*.js',      // Changed: support nested folders
  './src/support/*.js'
],
format: ['progress', 'json:./reports/report.json'],
paths: ['./features/**/*.feature'],  // Changed: support nested folders,
    parallel: 1,
    timeout: 120000
  }
};