# Microfrontends Base

A POC collection of Angular and ReactJS apps using a microfontends monorepo architecture, generated with [Nx](https://nx.dev).

## Build & Serve

### Build Shell & Apps

- Run `npm run build` to build the shell and all apps.
- Run `npm run build:shell` to build only the shell.
- Run `npm run build:clients` to build only the client apps.
- Run `npm run build:client-ng-a` to build only the Angular client example A app.
- Run `npm run build:client-ng-b` to build only the Angular client example B app.

### Serve Shell & Apps

Serving via the default @nrwl/web:dev-server server does not serve files for all apps in runtime, and therefore live-server is used.

This requires first ensuring the shell and apps have been built on changes.

Run `npm start`

Or run each separately as separate apps:

- Run `npm run serve` to serve the shell and all apps.
- Run `npm run serve:shell` to serve only the shell.
- Run `npm run serve:client-ng-a` to serve only the Angular client example A app.
- Run `npm run serve:client-ng-b` to serve only the Angular client example B app.

### Building Angular Apps: Combine common libraries

The following shows how to share core Angular library dependancies between Angular apps,
and so reduce redundant code between them.

#### Externalising common libraries

Reference a custom webpack config `webpack-ng.config.js` with an 'externals' property to remap all Angular library imports which are common between apps into objects referenced on the global window object: `window.ng`, and so be accessible as common external references.

> eg. `externals: {'@angular/core': 'ng.core', ...}`

Add each imported library as UMD bundles to the shell's build scripts (mfe-shell:architect:build:options:scripts) to be compiled into the shell's scripts.js file.

Note: the order in which they're listed matters (rxjs > core > comomon > common-http > compiler, ...).

> eg. `"scripts": ["node_modules/@angular/core/bundles/core.umd.js", ...]`

Replace the default builder for all Angular projects to `ngx-build-plus:build` (architect:build:builder) for all Angular apps (instead of the default `@nrwl/web:build` or `@angular-devkit/build-angular` builders). This extends the Angular CLI and ensures both that a single self-contained bundle is created (as opposed ot the many separate bundles generated from the default builder), and that a custom webpack config can be used to remap the library imports to the global scope using the 'externals' collection.

To ensure a single bunle is generated, call `nx build` with the `--single-bundle` flag.

To use the custom webpack config for externals in your build process, call `nx build` with the `--extra-webpack-config==webpack-ng.config.js` flag.

Now the libary code included in both the externals and shell scripts will be shared by each Angular instance!

> NB: in order to avoid the `enableProdMode()` called multiple times on the shared `@angular/core`, this must be removed from each Angular `main.ts` file and instead be called from the shell's main element's `connectedCallback` on the libaraies global reference on the window object: `window.ng.core.enableProdMode()` .

> NB: An alternative to the `ngx-build-plus` library can be used to add webpack functionality: `@angular-builders/custom-webpack:browser`. This is used instead instead through these options in the workspace.json:(app-foo:architect:build:options): `"customWebpackConfig": { "path": "./webpack-ng.externals.js", "mergeStrategies": { "externals": "replace" } }`.

See [here](https://www.npmjs.com/package/@angular-builders/custom-webpack#custom-webpack-browser) for details.

#### Combining polyfills

Ensure common Angular polyfills are also added to the shell's polyfills and removed from each app, so to only load these once on the top-level.

> eg. `import 'zone.js/dist/zone'; import 'hammerjs/hammer';`

#### Reducing bundle size: Using Ivy

To opt-in using the new Angular Ivy compiler, set `"enableIvy": true` on each Angular project's tsconfig.json, and `"aot": true` under each project's workspace build options (architect:build:options). It is however recommended to use Ivy with Angular Elements when Angular v9 comes out. This is because Ivy with Angular 8 is not yet ready to be used with Angular Elements (see [here](https://github.com/angular/angular/issues/30262)).

#### Implementing Lazy Loading (without the Router)

Included is a service to enable lazy-loading modules without using the router (@microfr/shared/ui-angular/LazyLoaderService).

> TODO: Add further instructions for using this.

### Build React Apps

## Styling

### Include shared SASS styles

Shared SASS files are managed in the shared-ui-styles library.

After creating a new lib or app which relies on common styling, add the path to this library to its SASS paths in order to import the styes:

Paste into /architect/build/options:\
`"stylePreprocessorOptions": {"includePaths": ["libs/shared/ui-styles/src/lib"]}`

Import all styles at once into the global sass file of the library as `@import 'shared-ui-styles/all`;

Then access specific modules as `@import 'shared-ui-styles/variables';`

> TODO: Add reasons and instructions for both fully ancapsulating styles through Shadow DOM, vs sharing through base classes.
