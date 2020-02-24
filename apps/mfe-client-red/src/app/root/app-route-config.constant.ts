import { IconMat } from '@microfr/shared/ui';
import { appConfig } from '../core/constants/build.constant';
import { RouteConfig } from '../shared/models/routes.model';

// Define the route which activates app-specific content when used within micro-frontend.
const appSpecificRoute: string = appConfig.route;

/**
 * Route config defining the details for each page which is navigated to via the
 * router.
 */
export const appRouteConfig: RouteConfig = {
  appRoot: {
    name: appSpecificRoute,
    label: appConfig.label,
    icon: IconMat.Home,
  },
  // Activate an example feature when routed to the app-specific route.
  featureFoo: {
    name: appSpecificRoute,
    label: 'Feature Foo',
  },
  featureFooA: {
    name: 'foo-a',
    label: 'Feature Foo A',
    icon: IconMat.RandomA,
  },
  featureFooB: {
    name: 'foo-b',
    label: 'Feature Foo B',
    icon: IconMat.RandomB,
  },
};
