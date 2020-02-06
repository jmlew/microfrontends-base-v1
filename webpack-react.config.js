const nrwlReactWebpack = require('@nrwl/react/plugins/webpack');

/**
 * Sass rules which can be used for SASS / CSS / JS conversions.
 */
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
