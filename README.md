# Microfrontends Base

A POC collection of Angular and ReactJS apps using a microfontends monorepo architecture,
generated with [Nx](https://nx.dev).

## Build & Serve

### Build Shell & Apps

- Run `npm run build` to build the shell and all apps.
- Run `npm run build:shell` to build only the shell.
- Run `npm run build:clients` to build only the client apps.
- Run `npm run build:client-ng-a` to build only the Angular client example A app.
- Run `npm run build:client-ng-b` to build only the Angular client example B app.

### Serve Shell & Apps

Serving via the default @nrwl/web:dev-server server does not serve files for all apps
in runtime, and therefore live-server is used.

This requires first ensuring the shell and apps have been built on changes.

Run `npm start`

Or run each separately as separate apps:

- Run `npm run serve` to serve the shell and all apps.
- Run `npm run serve:shell` to serve only the shell.
- Run `npm run serve:client-ng-a` to serve only the Angular client example A app.
- Run `npm run serve:client-ng-b` to serve only the Angular client example B app.

### Building Angular Apps: Combine common libraries

Reference the custom webpack config `webpack-ng.config.js` with an 'externals' property to remap all Angular library
imports which are common between apps into objects referenced on the global object
(window.ng), to therefore be accessed as external references.

eg. `externals: {'@angular/core': 'ng.core', ...}`

Add each added librarys' UMD bundle to the shell's build scripts
(mfe-shell:architect:build:options:scripts) to be compiled into the shell's scripts.js.
Note: the order in which they're listed matters (rxjs > core > comomon > common-http > compiler, ...).

eg. `"scripts": ["node_modules/@angular/core/bundles/core.umd.js", ...]`

Use the builder `@angular-builders/custom-webpack:browser` (app-foo:architect:build:builder)
for all Angular apps (instead of the default `@nrwl/web:build` or `@angular-devkit/build-angular` builders)
which extends the Angular CLI and uses the custom webpack config.

Ensure the build options includes these options for using the config (app-foo:architect:build:options):
`"customWebpackConfig": { "path": "./webpack.externals.js", "mergeStrategies": { "externals": "replace" } },`

See [here](https://www.npmjs.com/package/@angular-builders/custom-webpack#custom-webpack-browser) for details.

Ensure common polyfills are also added to the shell's polyfills and removed from each app,
so to only load these once on the top-level.
eg. `import 'zone.js/dist/zone'`

Note: Until using Ivy as the CLI builder, do not lazy load modules.

### Build React Apps

## Styling

### Include shared SASS styles

Shared SASS files are managed in the shared-ui-styles library.

After creating a new lib or app which relies on common styling, add the path to this
library to its SASS paths in order to import the styes:

Paste into /architect/build/options:\
`"stylePreprocessorOptions": {"includePaths": ["libs/shared/ui-styles/src/lib"]}`

Import all styles at once into the global sass file of the library as `@import 'shared-ui-styles/all`;

Then access specific modules as `@import 'shared-ui-styles/variables';`
