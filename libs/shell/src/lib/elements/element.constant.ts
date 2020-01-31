import { ElementName, ElementRoute, ElementLabel } from './element.enum';
import { ClientConfig } from './element.model';

// TODO: Enable differential loading of the below scripts using technique in index.html.
// Currently turned off with each browserlist set only to es2015 browsers.

// TODO: provide api proxy for dev vs prod.
const api = 'http://localhost:4200/';

export const clientsConfig: { [name: string]: ClientConfig } = {
  clientAngularA: {
    isLoaded: false,
    element: ElementName.ClientAngularA,
    route: ElementRoute.ClientAngularA,
    label: ElementLabel.ClientAngularA,
    scripts: [
      `${api}${ElementName.ClientAngularA}/polyfills.js`,
      `${api}${ElementName.ClientAngularA}/main.js`,
      // `${ElementName.ClientAngularA}/runtime.js`, // Combined into main with ng-build-plus
    ],
  },
  clientAngularB: {
    isLoaded: false,
    element: ElementName.ClientAngularB,
    route: ElementRoute.ClientAngularB,
    label: ElementLabel.ClientAngularB,
    scripts: [
      `${api}${ElementName.ClientAngularB}/polyfills.js`,
      `${api}${ElementName.ClientAngularB}/main.js`,
      // `${ElementName.ClientAngularB}/runtime.js`, // Combined into main with ng-build-plus
    ],
  },
  clientReactB: {
    isLoaded: false,
    element: ElementName.ClientReactA,
    route: ElementRoute.ClientReactA,
    label: ElementLabel.ClientReactA,
    scripts: [
      'mfe-client-react-a/main.es5.js',
      'mfe-client-react-a/polyfills.es5.js',
      'mfe-client-react-a/runtime.js',
    ],
  },
};
