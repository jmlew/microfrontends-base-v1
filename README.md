# Microfrontends Base

A POC collection of Angular and ReactJS apps using a microfontends monorepo architecture, generated with [Nx](https://nx.dev).

## Build Shell & Apps

- Run `npm run build` to build the shell and all apps.
- Run `npm run build:shell` to build only the shell.
- Run `npm run build:clients` to build only the client apps.
- Run `npm run build:client-ng-a` to build only the Angular client example A app.
- Run `npm run build:client-react-a` to build only the React client example A app.

## Serve Shell & Apps

Serving via the default @nrwl/web:dev-server server does not serve files for all apps in runtime, and therefore live-server is used.

This requires first ensuring the shell and apps have been built on changes.

Run `npm start`

Or run each separately as separate apps:

- Run `npm run serve` to serve the shell and all apps.
- Run `npm run serve:shell` to serve only the shell.
- Run `npm run serve:client-ng-a` to serve only the Angular client example A app.
- Run `npm run serve:client-react-a` to serve only the React client example A app.

## Adding polyfills

1. Ensure Webcomponents polyfills `polyfill-webcomp` and `polyfill-webcomp-es5` are added to the global scope through the workspace shell build scripts.

> These are created by the @webcomponents/webcomponentsjs library and renamed using he CLI `bundleName` option, as shown in the existing workspace config (mfe-shell:architect:build:options:scripts).

1. Ensure common Angular polyfills are moved from each project's polyfills into to the shell's polyfills, to ensure they are loaded only once at top-level.

> eg. `import 'zone.js/dist/zone'; import 'hammerjs/hammer';`

## Building Angular Apps

### Combine common libraries

The following shows how to share core Angular library dependancies between Angular apps, and so reduce redundant code between them.

#### 1. Webpack externals config

Reference a custom webpack config `webpack-ng.config.js` with an 'externals' property to remap all Angular library imports which are common between apps into objects referenced on the global window object: `window.ng`, and so be accessible as common external references.

> eg. `externals: {'@angular/core': 'ng.core', ...}`

#### 2. Custom Angular builder (single bundle)

Replace the default builder for all Angular projects to `ngx-build-plus:build` (architect:build:builder) for all Angular apps (instead of the default `@nrwl/web:build` or `@angular-devkit/build-angular` builders). This extends the Angular CLI and ensures both that a single self-contained bundle is created (as opposed to multiple separate bundles generated from the default builder), and that the above webpack config can be used to remap the library imports to the global scope.

1. To generate a single bundle: `nx build` with the `--single-bundle` flag.

1. To use the custom webpack config: `nx build` with the `--extra-webpack-config==webpack-ng.config.js` flag.

> NB: An alternative to the `ngx-build-plus` library can also be used to add webpack functionality: `@angular-builders/custom-webpack:browser`. This is applied to the build through these build options in the workspace (app-foo:architect:build:options): `"customWebpackConfig": { "path": "./webpack-ng.externals.js", "mergeStrategies": { "externals": "replace" } }`. See [here](https://www.npmjs.com/package/@angular-builders/custom-webpack#custom-webpack-browser) for details.

#### 3. Bundling UMD scripts

Add each imported library as UMD bundles to the shell's build scripts (mfe-shell:architect:build:options:scripts) to be compiled into the shell's scripts.js file.

Note: the order in which they're listed matters (rxjs > core > comomon > common-http > compiler, ...).

> eg. `"scripts": ["node_modules/@angular/core/bundles/core.umd.js", ...]`

Now the libary code included in both the externals and shell scripts will be shared by each Angular instance!

> NB: in order to avoid the `enableProdMode()` called multiple times on the shared `@angular/core`, this must be removed from each Angular `main.ts` file and instead be called from the shell's main element's `connectedCallback` on the libaraies global reference on the window object: `window.ng.core.enableProdMode()` .

### Reducing bundle size: Using Ivy

To opt-in using the new Angular Ivy compiler, set the following for each Angular project: `"enableIvy": true` in each tsconfig.json, and `"aot": true` under each workspace config (architect:build:options). However, it's recommended to use the official release of Ivy (Angular v9) when using Angular Elements (see [here](https://github.com/angular/angular/issues/30262)).

### Implementing Lazy Loading (without the Router)

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
