import { Routes } from '@angular/router';

import { appRouteConfig } from '../../root/app-route-config.constant';
import * as fromFooAViews from './foo-a/views';
import * as fromFooBViews from './foo-b/views';
import * as fromViews from './views';

/**
 * A collection of routes defining the Foo feature. This is not included in a
 * feature-routing module, since these routes are simply imported into the top-level root
 * route configs.
 */
export const fooRoutes: Routes = [
  {
    path: '',
    component: fromViews.FooMainView,
    children: [
      {
        path: appRouteConfig.featureFooA.name,
        component: fromFooAViews.FooAMainView,
      },
      {
        path: appRouteConfig.featureFooB.name,
        component: fromFooBViews.FooBMainView,
      },
    ],
  },
];
