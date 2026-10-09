module.exports = {
  default: {
    require: ['src/hooks/**/*.js', 'src/steps/**/*.js'],
    paths: ['src/features/**/*.feature'],
    format: ['progress-bar'],
    publishQuiet: true,
  },
};
