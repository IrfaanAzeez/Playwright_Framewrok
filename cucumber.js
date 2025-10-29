module.exports = {
  default: {
    require: [
      './src/steps/*.js',
      './src/support/*.js'
    ],
    format: ['progress', 'json:./reports/report.json'],
    paths: ['./features/*.feature'],
    parallel: 1,
    timeout: 120000
  }
};