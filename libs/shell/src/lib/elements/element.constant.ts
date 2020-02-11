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
  clientRed: {
    isLoaded: false,
    name: ElementName.ClientRed,
    label: ElementLabel.ClientRed,
    route: ElementRoute.ClientRed,
    scripts: isDevMode
      ? [
          `${ElementDevServerLoc.ClientRed}polyfills.js`,
          `${ElementDevServerLoc.ClientRed}main.js`,
        ]
      : [
          `${ElementProdServerLoc.ClientRed}polyfills.js`,
          `${ElementProdServerLoc.ClientRed}main.js`,
        ],
  },
  clientBlue: {
    isLoaded: false,
    name: ElementName.ClientBlue,
    label: ElementLabel.ClientBlue,
    route: ElementRoute.ClientBlue,
    scripts: isDevMode
      ? [
          `${ElementDevServerLoc.ClientBlue}main.js`,
          `${ElementDevServerLoc.ClientBlue}polyfills.js`,
          `${ElementDevServerLoc.ClientBlue}vendor.js`,
          `${ElementDevServerLoc.ClientBlue}runtime.js`,
        ]
      : [
          `${ElementProdServerLoc.ClientBlue}main.es5.js`,
          `${ElementProdServerLoc.ClientBlue}polyfills.es5.js`,
          `${ElementProdServerLoc.ClientBlue}runtime.js`,
        ],
  },
};
