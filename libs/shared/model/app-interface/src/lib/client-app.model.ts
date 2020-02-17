/**
 * Sample models defining the I/O interface between apps.
 */

export interface ClientAppInfo {
  name: string;
  description: string;
}

export interface ClientAppInfoInputs {
  appInfo: ClientAppInfo;
}

/**
 * Defines the client custom element with common properties
 */
export interface ClientAppElement extends HTMLElement, ClientAppInfoInputs {}
