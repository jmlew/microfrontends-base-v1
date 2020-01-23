import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { rootRoutes } from './app.routes';
import { AppRootComponent } from './core/components';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    SharedModule,

    // RouterModule.forRoot([], { initialNavigation: 'enabled' })
    RouterModule.forRoot(rootRoutes, { useHash: true }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required if this project is loading non-angular custom elements.
  providers: [],
  bootstrap: [],
  entryComponents: [AppRootComponent],
  declarations: [],
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    console.log('ngDoBootstrap :', this);
    // TODO: Get client app tag name form global store.
    const appTagName = 'mfe-client-a';
    const appElement: NgElementConstructor<void> = createCustomElement(AppRootComponent, {
      injector: this.injector,
    });
    customElements.define(appTagName, appElement);
  }
}
