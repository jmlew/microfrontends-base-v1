import { Routes } from '@angular/router';

import * as fromComponents from './components';
import { routeConfig } from './constants';

export const routes: Routes = [
  {
    path: routeConfig.main.name,
    component: fromComponents.MainComponent,
  },
];
