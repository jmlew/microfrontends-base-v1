const nrwlReactWebpack = require('@nrwl/react/plugins/webpack');

module.exports = (config) => {
  // Add sample rules to config.
  // config.module.rules.unshift(sampleRulesHere);
  return { ...nrwlReactWebpack(config) };
};
