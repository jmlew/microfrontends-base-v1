const nrwlReactWebpack = require('@nrwl/react/plugins/webpack');

const sassRules = {
  test: /\.scss$/,
  use: [
    {
      loader: 'style-loader', // creates style nodes from JS strings
    },
    {
      loader: 'sass-loader', // compiles Sass to CSS
    },
  ],
};

module.exports = (config) => {
  config.module.rules.unshift(sassRules);
  return { ...nrwlReactWebpack(config) };
};
