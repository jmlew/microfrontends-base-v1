import { Routes } from '@angular/router';

import { appRouteConfig } from '../../root/app-route-config.constant';
import * as fromFooAViews from './foo-a/views';
import * as fromFooBViews from './foo-b/views';
import * as fromViews from './views';

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
