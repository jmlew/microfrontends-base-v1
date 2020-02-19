import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { fooRoutes } from '../features/foo/foo.routes';
import { EmptyView } from '../views/empty/empty.view';
import { ShellView } from '../views/shell/shell.view';
import { appRouteConfig } from './app-route-config.constant';

/**
 * Main routes for a micro-frontends implimentation of app.
 *
 * Optional EmptyView can 'destroy' the app's content on routes which are not prefixed
 * with an app-specific route.
 */
const appRoutes: Routes = [
  // Activate example feature within shell.
  {
    path: appRouteConfig.featureFoo.name,
    component: ShellView,
    children: fooRoutes,
  },
  {
    path: '**',
    component: ShellView,
  },

  // Detach this app through an empty component for paths which exclude this app's prefix.
  { path: '**', component: EmptyView },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
