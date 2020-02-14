import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import * as fromComps from './components';

const EXPORTED_DECLARATIONS: any[] = [...fromComps.exports];

@NgModule({
  imports: [SharedModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS],
})
export class MenuModule {}
