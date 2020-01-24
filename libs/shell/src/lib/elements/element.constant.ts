import { ElementName, ElementRoute } from './element.enum';
import { ClientConfig } from './element.model';

export const clientsConfig: { [name: string]: ClientConfig } = {
  clientA: {
    isLoaded: false,
    element: ElementName.ClientA,
    route: ElementRoute.ClientA,
    scripts: [
      // Using ngx-build-plus:
      'mfe-client-a/polyfills.js',
      'mfe-client-a/main.js',

      // Below scripts are combined into main.js when using ngx-build-plus
      // 'mfe-client-a/runtime.js',
    ],
  },
  clientB: {
    isLoaded: false,
    element: ElementName.ClientB,
    route: ElementRoute.ClientA,
    scripts: [
      'mfe-client-b/main.es5.js',
      'mfe-client-b/polyfills.es5.js',
      'mfe-client-b/runtime.js',
    ],
  },
};
