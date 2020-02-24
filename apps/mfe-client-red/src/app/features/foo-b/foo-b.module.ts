import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import * as fromViews from './views';

const EXPORTED_DECLARATIONS: any[] = [...fromViews.exports];

@NgModule({
  imports: [SharedModule],
  declarations: [EXPORTED_DECLARATIONS],
  exports: [EXPORTED_DECLARATIONS],
  providers: [],
})
export class FooBModule {}
