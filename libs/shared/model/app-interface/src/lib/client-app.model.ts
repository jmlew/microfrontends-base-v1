/**
 * Sample models defining the I/O interface between apps.
 */

export interface ClientAppDetails {
  name: string;
  description: string;
}

/**
 * Properties / attributes common to all client apps.
 */
export interface ClientAppPropsCommon {
  appDetails: ClientAppDetails;
}

/**
 * Defines the client custom element with common properties
 */
export interface ClientAppElement extends HTMLElement, ClientAppPropsCommon {}
