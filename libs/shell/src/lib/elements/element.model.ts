import { ElementLabel, ElementName, ElementRoute } from '.';

export interface ClientConfig {
  isLoaded: boolean;
  scripts: string[];
  element: ElementName;
  label: ElementLabel;
  route: ElementRoute;
}
