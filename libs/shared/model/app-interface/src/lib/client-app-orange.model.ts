import {
  ClientAppElement,
  ClientAppMessage,
  ClientAppPropsCommon,
} from './client-app.model';

export interface OrangeAppMessage extends ClientAppMessage {
  message: string;
}

export interface OrangeClientAppProps extends ClientAppPropsCommon {
  appMessage: OrangeAppMessage;
}

/**
 * Defines the custom element with custom properties.
 */
export interface OrangeClientAppElement extends ClientAppElement, OrangeClientAppProps {}
