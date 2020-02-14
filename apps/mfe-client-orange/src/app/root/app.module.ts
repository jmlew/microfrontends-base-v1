import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import {
  createCustomElement,
  NgElementConstructor,
  NgElementStrategyFactory,
} from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { defineCustomElement } from '@microfr/shell';
import { appConfig } from '../core/constants';
import { CoreModule } from '../core/core.module';
import { MenuModule } from '../features/menu/menu.module';
import { LayoutModule } from '../layout/layout.module';
import { AppRootComponent } from './app-root.component';

@NgModule({
  imports: [
    // Angular.
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,

    // App Main "singleton" modules.
    CoreModule,
    LayoutModule,

    // App Features.
    MenuModule,
  ],
  providers: [],
  declarations: [AppRootComponent],
  entryComponents: [AppRootComponent],
  // bootstrap: [], // Bootrstrapping handled in ngDoBootstrap.
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    console.log('ngDoBootstrap :', appConfig.name);

    // Create custom strategy factory which always runs in the NgZone to avoid zone
    // conflicts with future parent / child Ng elements.
    const strategyFactory: NgElementStrategyFactory = new ElementZoneStrategyFactory(
      AppRootComponent,
      this.injector
    );

    // Create root element constructor for use in defining the custom element.
    const AppElement: NgElementConstructor<AppRootComponent> = createCustomElement(
      AppRootComponent,
      {
        injector: this.injector,
        strategyFactory,
      }
    );
    defineCustomElement(appConfig.name, AppElement);
  }
}
