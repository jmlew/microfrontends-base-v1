import { ElementName, ElementRoute } from './element.enum';
import { ClientConfig } from './element.model';

// TODO: Enable differential loading of the below scripts using technique in index.html.
// Currently turned off with each browserlist set only to es2015 browsers.

export const clientsConfig: { [name: string]: ClientConfig } = {
  clientAngularA: {
    isLoaded: false,
    element: ElementName.ClientAngularA,
    route: ElementRoute.ClientAngularA,
    scripts: [
      `${ElementName.ClientAngularA}/polyfills.js`,
      `${ElementName.ClientAngularA}/main.js`,
      `${ElementName.ClientAngularA}/runtime.js`,
    ],
  },
  clientAngularB: {
    isLoaded: false,
    element: ElementName.ClientAngularB,
    route: ElementRoute.ClientAngularB,
    scripts: [
      `${ElementName.ClientAngularB}/polyfills.js`,
      `${ElementName.ClientAngularB}/main.js`,
      `${ElementName.ClientAngularB}/runtime.js`,
    ],
  },
  clientReactB: {
    isLoaded: false,
    element: ElementName.ClientReactA,
    route: ElementRoute.ClientReactA,
    scripts: [
      'mfe-client-react-a/main.es5.js',
      'mfe-client-react-a/polyfills.es5.js',
      'mfe-client-react-a/runtime.js',
    ],
  },
};
