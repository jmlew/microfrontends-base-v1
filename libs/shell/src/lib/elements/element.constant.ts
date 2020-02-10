import {
  ElementDevServerLoc,
  ElementLabel,
  ElementName,
  ElementProdServerLoc,
  ElementRoute,
} from './element.enum';
import { ClientConfig } from './element.model';

// TODO: Enable differential loading of the below scripts using technique in index.html.
// Currently turned off with each browserlist set only to es2015 browsers.

// TODO: Switch between prod and dev by loading scripts from within shell dir in
// dist or via app's dev server location.

const isDevMode = false;

export const clientsConfig: { [name: string]: ClientConfig } = {
  clientAngularA: {
    isLoaded: false,
    name: ElementName.ClientAngularA,
    label: ElementLabel.ClientAngularA,
    route: ElementRoute.ClientAngularA,
    scripts: isDevMode
      ? [
          `${ElementDevServerLoc.ClientAngularA}polyfills.js`,
          `${ElementDevServerLoc.ClientAngularA}main.js`,
        ]
      : [
          `${ElementProdServerLoc.ClientAngularA}polyfills.js`,
          `${ElementProdServerLoc.ClientAngularA}main.js`,
        ],
  },
  clientReactA: {
    isLoaded: false,
    name: ElementName.ClientReactA,
    label: ElementLabel.ClientReactA,
    route: ElementRoute.ClientReactA,
    scripts: isDevMode
      ? [
          `${ElementDevServerLoc.ClientReactA}main.js`,
          `${ElementDevServerLoc.ClientReactA}polyfills.js`,
          `${ElementDevServerLoc.ClientReactA}vendor.js`,
          `${ElementDevServerLoc.ClientReactA}runtime.js`,
        ]
      : [
          `${ElementProdServerLoc.ClientReactA}main.es5.js`,
          `${ElementProdServerLoc.ClientReactA}polyfills.es5.js`,
          `${ElementProdServerLoc.ClientReactA}runtime.js`,
        ],
  },
};
