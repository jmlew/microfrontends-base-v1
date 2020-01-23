import { IconMat } from '../enums/icons.enum';
import { RouteConfig } from '../models/routes.model';

/**
 * Route config defining the details for each page which is navigated to via the
 * router.
 */
export const rootRouteConfig: RouteConfig = {
  // TODO: Provide top-level app path via shared library.
  app: {
    name: 'client-a',
    path: '/client-a',
    label: 'Client A',
  },
  featureA: {
    name: 'feature-a',
    path: '/feature-a',
    label: 'Feature A',
    icon: IconMat.Home,
  },
  featureB: {
    name: 'feature-b',
    path: '/feature-b',
    label: 'Feature B',
    icon: IconMat.Dashboard,
  },
};
