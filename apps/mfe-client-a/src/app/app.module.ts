import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule
    // RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required if this project is loading non-angular custom elements.
  providers: [],
  bootstrap: [],
  declarations: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    console.log('ngDoBootstrap :', this);
    const appTagName = 'mfe-client-a';
    const appElement: NgElementConstructor<void> = createCustomElement(
      AppComponent,
      {
        injector: this.injector
      }
    );
    customElements.define(appTagName, appElement);
  }
}
