import { Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { appRoutes } from './app.routes';
import { AppRootComponent } from './core/components';
import { FeatureAModule } from './features/feature-a/feature-a.module';
import { FeatureBModule } from './features/feature-b/feature-b.module';
import { appConfig } from './shared/constants';
import { defineCustomElement } from '@microfr/shell';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    SharedModule,

    // Feature modules - not lazy loaded through the router.
    // TODO: provide lazy loading using the NgModuleFactoryLoader.
    // FeatureAModule,
    FeatureBModule,

    // RouterModule.forRoot([], { initialNavigation: 'enabled' })
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [AppRootComponent],
  declarations: [],
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    const appElement: NgElementConstructor<void> = createCustomElement(AppRootComponent, {
      injector: this.injector,
    });
    console.log('ngDoBootstrap :', appConfig.element);
    defineCustomElement(appConfig.element, appElement);
  }
}
