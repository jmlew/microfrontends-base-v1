export enum ElementName {
  Shell = 'mfe-shell',
  ClientRed = 'mfe-client-red',
  ClientBlue = 'mfe-client-blue',
}

export enum ElementLabel {
  Shell = 'Shell',
  ClientRed = 'Client Red: Angular App',
  ClientBlue = 'Client Blue: React App',
}

export enum ElementRoute {
  Shell = '/',
  ClientRed = 'red',
  ClientBlue = 'blue',
}

export enum ElementDevServerLoc {
  Shell = 'http://localhost:6600/',
  ClientRed = 'http://localhost:6610/',
  ClientBlue = 'http://localhost:6620/',
}

/**
 * Placeholder for production server locations. Currently mapped to dev servers.
 */
export enum ElementProdServerLoc {
  Shell = ElementDevServerLoc.Shell,
  ClientRed = ElementDevServerLoc.ClientRed,
  ClientBlue = ElementDevServerLoc.ClientBlue,
}
