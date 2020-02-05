const defaultConfigs = require('@nrwl/react/plugins/webpack');

module.exports = (config) => {
  config.module.rules.unshift(...defaultConfigs(config).module.rules, {
    test: /\.m?(j|t)s$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              debug: true, // If you see the debug in your console; this is working
            },
          ],
        ],
      },
    },
  });
  return config;
};
