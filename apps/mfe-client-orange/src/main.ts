import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/root/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  // enableProdMode(); // Called once for all apps by the shell on the global window.ng.core UMD file.
}

platformBrowserDynamic()
  // Version excluding Zone which reduces bundle-size as well as avoiding potential
  // conflicts in other apps with Zone's monkey-patched native methods.
  // .bootstrapModule(AppModule, { ngZone: 'noop' })
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
