import { IconMat } from '@microfr/shared/ui';
import { ElementRoute } from '@microfr/shell';

export interface RouteItem {
  name: string | ElementRoute;
  label?: string;
  path?: string;
  icon?: IconMat;
}

export interface RouteConfig {
  [route: string]: RouteItem;
}
