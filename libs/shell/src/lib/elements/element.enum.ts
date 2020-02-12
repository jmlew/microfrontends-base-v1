export enum ElementName {
  Shell = 'mfe-shell',
  ClientRed = 'mfe-client-red',
  ClientBlue = 'mfe-client-blue',
  ClientOrange = 'mfe-client-orange',
}

export enum ElementLabel {
  Shell = 'Shell',
  ClientRed = 'Red: Angular App',
  ClientBlue = 'Blue: React App',
  ClientOrange = 'Orange: Angular App',
}

export enum ElementRoute {
  Shell = '/',
  ClientRed = 'red',
  ClientBlue = 'blue',
  ClientOrange = 'orange',
}

export enum ElementDevServerLoc {
  Shell = 'http://localhost:6600/',
  ClientRed = 'http://localhost:6610/',
  ClientBlue = 'http://localhost:6620/',
  ClientOrange = 'http://localhost:6630/',
}

/**
 * Placeholder for production server locations. Currently mapped to dev servers.
 */
export enum ElementProdServerLoc {
  Shell = ElementDevServerLoc.Shell,
  ClientRed = ElementDevServerLoc.ClientRed,
  ClientBlue = ElementDevServerLoc.ClientBlue,
  ClientOrange = ElementDevServerLoc.ClientOrange,
}
