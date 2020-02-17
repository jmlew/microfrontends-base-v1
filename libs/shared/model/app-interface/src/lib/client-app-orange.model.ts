import { ClientAppPropsCommon } from './client-app.model';

export interface OrangeAppMessage {
  fromApp: string;
  message: string;
}

export interface OrangeClientAppProps extends ClientAppPropsCommon {}
