import { IconMat } from '../enums/icons.enum';
import { RouteConfig } from '../models/routes.model';
import { appConfig } from './build.constant';

/**
 * Route config defining the details for each page which is navigated to via the
 * router.
 */
export const rootRouteConfig: RouteConfig = {
  appRoot: {
    name: appConfig.route,
    label: 'Client A',
    icon: IconMat.Home,
  },
  featureA: {
    name: 'feature-a',
    label: 'Feature A',
    icon: IconMat.Person,
  },
  featureB: {
    name: 'feature-b',
    label: 'Feature B',
    icon: IconMat.Dashboard,
  },
};
