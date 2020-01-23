import { Routes } from '@angular/router';

import { AppMenuComponent } from './core/components';
import { EmptyComponent } from './shared/components';
import { rootRouteConfig } from './shared/constants';

/**
 * Main routes for this microfrontend app. All routes caught by this app are prefixed with
 * the top-level path as defined in the [enter lib name here] lib.
 *
 * All others are caught by other apps and therefore load an empty component as a simple
 * method of allowing the shell to switch between apps.
 */
export const rootRoutes: Routes = [
  {
    path: '',
    // path: rootRouteConfig.app.name,
    component: AppMenuComponent,
    children: [
      {
        path: rootRouteConfig.featureA.name,
        loadChildren: () =>
          import('./features/feature-a/feature-a.module').then((m) => m.FeatureAModule),
      },
      {
        path: rootRouteConfig.featureB.name,
        loadChildren: () =>
          import('./features/feature-b/feature-b.module').then((m) => m.FeatureBModule),
      },
    ],
  },

  // Detach this app through an empty coponent for paths which exclude this app's prefix.
  { path: '**', component: EmptyComponent },
];
