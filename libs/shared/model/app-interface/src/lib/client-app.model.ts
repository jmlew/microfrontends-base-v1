import { ClientApp } from './client-app.enum';

/**
 * Base interface for message objects sent between apps.
 */
export interface ClientAppMessage {
  toApp: ClientApp;
  fromApp?: ClientApp;
}

/**
 * Sample models defining the I/O interface between apps.
 */
export interface ClientAppDetails extends ClientAppMessage {
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
