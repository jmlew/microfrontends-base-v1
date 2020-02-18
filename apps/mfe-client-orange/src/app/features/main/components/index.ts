import { CommFromAppsDetailsComponent } from './comm-from-apps-details/comm-from-apps-details.component';
import { CommToAppsFormComponent } from './comm-to-apps-form/comm-to-apps-form.component';
import { CommTypeMenuComponent } from './comm-type-menu/comm-type-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

export const exports: any[] = [
  MainMenuComponent,
  CommTypeMenuComponent,
  CommFromAppsDetailsComponent,
  CommToAppsFormComponent,
];

export * from './main-menu/main-menu.component';
export * from './comm-type-menu/comm-type-menu.component';
export * from './comm-from-apps-details/comm-from-apps-details.component';
export * from './comm-to-apps-form/comm-to-apps-form.component';
