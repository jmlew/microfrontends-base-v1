export interface RouteItem {
  name: string;
  label?: string;
  path?: string;
  icon?: string;
}

export interface RouteConfig {
  [route: string]: RouteItem;
}
