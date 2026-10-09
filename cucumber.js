module.exports = {
  default: {
    require: ['src/hooks/**/*.js', 'src/steps/**/*.js'],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress',
      ['html', 'reports/bdd/cucumber.html'],
      'allure-cucumberjs/reporter',
    ],
    formatOptions: {
      resultsDir: 'reports/bdd/allure-results',
    },
  },
};
