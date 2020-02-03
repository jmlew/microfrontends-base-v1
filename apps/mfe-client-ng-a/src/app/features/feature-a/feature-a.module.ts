import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import * as fromComponents from './components';
import { routes } from './feature-a.route';

export const featureAModuleMainElement = 'feature-a-module-main-element';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...fromComponents.exports],
  providers: [],
})
export class FeatureAModule {}
