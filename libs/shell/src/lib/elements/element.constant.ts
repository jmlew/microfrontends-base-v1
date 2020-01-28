import { ElementName, ElementRoute } from './element.enum';
import { ClientConfig } from './element.model';

export const clientsConfig: { [name: string]: ClientConfig } = {
  clientAngularA: {
    isLoaded: false,
    element: ElementName.ClientAngularA,
    route: ElementRoute.ClientAngularA,
    scripts: [
      // Using ngx-build-plus:
      'mfe-client-ng-a/polyfills.js',
      'mfe-client-ng-a/main.js',

      // Below scripts are combined into main.js when using ngx-build-plus
      // 'mfe-client-ng-b/runtime.js',
    ],
  },
  clientAngularB: {
    isLoaded: false,
    element: ElementName.ClientAngularB,
    route: ElementRoute.ClientAngularB,
    scripts: [
      // Using ngx-build-plus:
      'mfe-client-ng-b/polyfills.js',
      'mfe-client-ng-b/main.js',

      // Below scripts are combined into main.js when using ngx-build-plus
      // 'mfe-client-ng-b/runtime.js',
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
