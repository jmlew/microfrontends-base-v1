import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import * as fromComponents from './components';
import { routes } from './feature-b.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...fromComponents.exports],
  providers: [],
})
export class FeatureBModule {}
