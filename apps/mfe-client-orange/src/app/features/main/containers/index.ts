import { CommFromAppsComponent } from './comm-from-apps/comm-from-apps.component';
import { CommToAppsComponent } from './comm-to-apps/comm-to-apps.component';
import { CommTypeComponent } from './comm-type/comm-type.component';

export const exports: any[] = [
  CommTypeComponent,
  CommFromAppsComponent,
  CommToAppsComponent,
];

export * from './comm-type/comm-type.component';
export * from './comm-from-apps/comm-from-apps.component';
export * from './comm-to-apps/comm-to-apps.component';
