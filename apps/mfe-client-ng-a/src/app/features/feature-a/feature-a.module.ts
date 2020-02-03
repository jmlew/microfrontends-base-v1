import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import * as fromComponents from './components';
import { routes } from './feature-a.route';
import { MainComponent } from './components';
import { NgElementConstructor, createCustomElement } from '@angular/elements';
import { defineCustomElement } from '@microfr/shell';

export const featureAModuleMainElement = 'feature-a-module-main-element';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...fromComponents.exports],
  providers: [],
  entryComponents: [MainComponent],
})
export class FeatureAModule {
  constructor(private injector: Injector) {
    console.log('FeatureAModule has loaded');
    this.initComponent();
  }

  private initComponent() {
    const appElement: NgElementConstructor<void> = createCustomElement(MainComponent, {
      injector: this.injector,
    });
    console.log('initComponent :', featureAModuleMainElement);
    defineCustomElement(featureAModuleMainElement, appElement);
  }
}
