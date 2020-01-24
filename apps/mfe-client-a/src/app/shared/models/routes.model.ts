import { ElementRoute } from '@microfr/shell';

export interface RouteItem {
  name: string | ElementRoute;
  label?: string;
  path?: string;
  icon?: string;
}

export interface RouteConfig {
  [route: string]: RouteItem;
}
