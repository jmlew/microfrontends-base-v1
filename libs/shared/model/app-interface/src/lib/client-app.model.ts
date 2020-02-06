/**
 * Sample models defining the I/O interface between apps.
 */

export interface ClientAppInfo {
  name: string;
  description: string;
}

export interface ClientAppElement extends HTMLElement {
  appInfo: ClientAppInfo;
}
