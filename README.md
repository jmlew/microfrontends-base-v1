# Microfrontends Base

A POC collection of Angular and ReactJS apps using a microfontends monorepo architecture with NX.

This project was generated using [Nx](https://nx.dev).

## Build & Serve

### Build Shell & Apps

- Run `npm run build` to build the shell and all apps.
- Run `npm run build:shell` to build only the shell.
- Run `npm run build:clients` to build only the client apps.
- Run `npm run build:client-a` to build only the client-a app.
- Run `npm run build:client-b` to build only the client-b app.

### Serve Shell & Apps

Serving via the default @nrwl/web:dev-server server does not serve files for all apps
in runtime, and therefore live-server is used.

This requires first ensuring the shell and apps have been built on changes.

Run `npm start`

Or run each separately as separate apps:

- Run `npm run serve` to serve the shell and all apps.
- Run `npm run serve:shell` to serve only the shell.
- Run `npm run serve:client-a` to serve only the client-a app.
- Run `npm run serve:client-b` to serve only the client-b app.

### Building Angular Apps

Uses the builder `ngx-build-plus:build` (instead of the default `@nrwl/web:build`)
which extends the Angular CLI and combines scripts into a single bundle.

Add this to all Angular apps created in workspace.json: architect > build > builder config.

See [here](https://www.npmjs.com/package/ngx-build-plus) for details.

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
