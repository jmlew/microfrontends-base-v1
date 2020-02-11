import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import * as fromComponents from './components';

@NgModule({
  imports: [HttpClientModule, RouterModule, SharedModule],
  declarations: [...fromComponents.exports],
  exports: [...fromComponents.exports],
  providers: [],
})
export class CoreModule {}
