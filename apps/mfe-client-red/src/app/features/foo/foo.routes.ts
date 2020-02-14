import { Routes } from '@angular/router';

import * as fromFooAViews from './foo-a/views';
import * as fromFooBViews from './foo-b/views';
import * as fromViews from './views';

export const fooRoutes: Routes = [
  {
    path: '',
    component: fromViews.FooMainView,
    children: [
      {
        path: 'foo-a',
        component: fromFooAViews.FooAMainView,
      },
      {
        path: 'foo-b',
        component: fromFooBViews.FooBMainView,
      },
    ],
  },
];
