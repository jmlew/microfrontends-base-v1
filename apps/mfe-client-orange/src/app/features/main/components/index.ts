import { CommFromAppsDetailsComponent } from './comm-from-apps-details/comm-from-apps-details.component';
import { CommToAppsDetailsComponent } from './comm-to-apps-details/comm-to-apps-details.component';
import { CommTypeMenuComponent } from './comm-type-menu/comm-type-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

export const exports: any[] = [
  MainMenuComponent,
  CommTypeMenuComponent,
  CommFromAppsDetailsComponent,
  CommToAppsDetailsComponent,
];

export * from './main-menu/main-menu.component';
export * from './comm-type-menu/comm-type-menu.component';
export * from './comm-from-apps-details/comm-from-apps-details.component';
export * from './comm-to-apps-details/comm-to-apps-details.component';
