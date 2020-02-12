import { Routes } from '@angular/router';

import * as fromCoreComps from './core/components';
import * as fromFeatureAComps from './features/feature-a/components';
import * as fromFeatureBComps from './features/feature-b/components';
import * as fromSharedComps from './shared/components';
import { rootRouteConfig } from './shared/constants';

/**
 * Main routes for this microfrontend app. All routes caught by this app are prefixed with
 * the top-level path as defined in the @microfr/shell lib.
 *
 * All others are caught by other apps and therefore load an empty component as a simple
 * method of allowing the shell to switch between apps.
 */
export const appRoutes: Routes = [
  {
    path: rootRouteConfig.appRoot.name,
    component: fromCoreComps.AppMenuComponent,
    children: [
      {
        path: rootRouteConfig.featureA.name,
        component: fromFeatureAComps.MainComponent,
      },
      {
        path: rootRouteConfig.featureB.name,
        component: fromFeatureBComps.MainComponent,
      },
    ],
  },
  { path: '**', component: fromCoreComps.AppHomeComponent },

  // Detach this app through an empty component for paths which exclude this app's prefix.
  // { path: '**', component: fromSharedComps.EmptyComponent },
];
