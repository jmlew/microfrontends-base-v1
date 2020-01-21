import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // Version excluding Zone which reduces bundle-size as well as avoiding potential
  // conflicts in other apps with Zone's monkey-patched native methods.
  // .bootstrapModule(AppModule, { ngZone: 'noop' })
  .catch(err => console.error(err));
