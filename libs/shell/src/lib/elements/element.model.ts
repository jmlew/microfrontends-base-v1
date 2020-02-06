import { ElementLabel, ElementName, ElementRoute } from '.';

export interface ClientConfig {
  isLoaded: boolean;
  scripts: string[];
  name: ElementName;
  label: ElementLabel;
  route: ElementRoute;
}
