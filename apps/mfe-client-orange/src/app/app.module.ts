import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import {
  createCustomElement,
  NgElementConstructor,
  NgElementStrategyFactory,
} from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { UiMatModule } from '@microfr/shared/ui-angular';
import { defineCustomElement } from '@microfr/shell';
import * as fromComponents from './components';
import { appConfig } from './constants';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    UiMatModule,
    FlexLayoutModule,
  ],
  declarations: [...fromComponents.exports],
  providers: [...fromServices.exports],
  bootstrap: [],
  entryComponents: [fromComponents.AppRootComponent],
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    console.log('ngDoBootstrap :', appConfig.name);

    // Create custom strategy factory which always runs in the NgZone to avoid zone
    // conflicts with future parent / child Ng elements.
    const strategyFactory: NgElementStrategyFactory = new ElementZoneStrategyFactory(
      fromComponents.AppRootComponent,
      this.injector
    );

    // Create root element constructor for use in defining the custom element.
    const AppElement: NgElementConstructor<
      fromComponents.AppRootComponent
    > = createCustomElement(fromComponents.AppRootComponent, {
      injector: this.injector,
      strategyFactory,
    });
    defineCustomElement(appConfig.name, AppElement);
  }
}
