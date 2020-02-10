export enum ElementName {
  Shell = 'mfe-shell',
  ClientAngularA = 'mfe-client-ng-a',
  ClientReactA = 'mfe-client-react-a',
}

export enum ElementLabel {
  Shell = 'Shell',
  ClientAngularA = 'Angular App A',
  ClientReactA = 'React App A',
}

export enum ElementRoute {
  Shell = '/',
  ClientAngularA = 'ng-a',
  ClientReactA = 'react-a',
}

export enum ElementDevServerLoc {
  Shell = 'http://localhost:6600/',
  ClientAngularA = 'http://localhost:6610/',
  ClientReactA = 'http://localhost:6620/',
}

/**
 * Placeholder for production server locations. Currently mapped to dev servers.
 */
export enum ElementProdServerLoc {
  Shell = ElementDevServerLoc.Shell,
  ClientAngularA = ElementDevServerLoc.ClientAngularA,
  ClientReactA = ElementDevServerLoc.ClientReactA,
}
