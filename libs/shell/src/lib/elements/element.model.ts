import { ElementName, ElementRoute } from '.';

export interface ClientConfig {
  isLoaded: boolean;
  scripts: string[];
  element: ElementName;
  route: ElementRoute;
}
