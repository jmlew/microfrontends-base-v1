import { ElementName, ElementRoute, ElementLabel } from '.';

export interface ClientConfig {
  isLoaded: boolean;
  scripts: string[];
  element: ElementName;
  label: ElementLabel;
  route: ElementRoute;
}
