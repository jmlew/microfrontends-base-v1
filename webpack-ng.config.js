const webpack = require('webpack');

// Libraries to be referenced as external references on the global object (window.ng).
module.exports = {
  externals: {
    rxjs: 'rxjs',
    '@angular/common': 'ng.common',
    '@angular/common/http': 'ng.common.http',
    '@angular/compiler': 'ng.compiler',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/router': 'ng.router',
    // '@angular/flex-layout': 'ng.flexLayout',
  },
};
