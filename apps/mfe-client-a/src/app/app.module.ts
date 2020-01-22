import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required if this project is loading non-angular custom elements.
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent],
  declarations: [AppComponent],
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    console.log('ngDoBootstrap :', this);
    const appTagName = 'mfe-client-a';
    const appElement: NgElementConstructor<void> = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define(appTagName, appElement);
  }
}
