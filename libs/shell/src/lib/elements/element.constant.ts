import { ElementLabel, ElementName, ElementRoute } from './element.enum';
import { ClientConfig } from './element.model';

// TODO: Enable differential loading of the below scripts using technique in index.html.
// Currently turned off with each browserlist set only to es2015 browsers.

// TODO: provide api proxy for dev vs prod.
const api = 'http://localhost:4200/';

export const clientsConfig: { [name: string]: ClientConfig } = {
  clientAngularA: {
    isLoaded: false,
    name: ElementName.ClientAngularA,
    label: ElementLabel.ClientAngularA,
    route: ElementRoute.ClientAngularA,
    scripts: [
      `${api}${ElementName.ClientAngularA}/polyfills.js`,
      `${api}${ElementName.ClientAngularA}/main.js`,
      // `${ElementName.ClientAngularA}/runtime.js`, // Combined into main with ng-build-plus
    ],
  },
  clientReactA: {
    isLoaded: false,
    name: ElementName.ClientReactA,
    label: ElementLabel.ClientReactA,
    route: ElementRoute.ClientReactA,
    scripts: [
      `${api}${ElementName.ClientReactA}/main.es5.js`,
      `${api}${ElementName.ClientReactA}/polyfills.es5.js`,
      `${api}${ElementName.ClientReactA}/runtime.js`,
    ],
  },
};
