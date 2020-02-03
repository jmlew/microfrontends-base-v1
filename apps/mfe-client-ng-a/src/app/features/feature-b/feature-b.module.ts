import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import * as fromComponents from './components';
import { routes } from './feature-b.route';
import { LazyLoaderService } from '@microfr/shared/ui-angular';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...fromComponents.exports],
  providers: [LazyLoaderService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureBModule {}
