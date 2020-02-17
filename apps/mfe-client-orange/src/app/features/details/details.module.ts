import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import * as fromComps from './components';
import * as fromContainers from './containers';

const EXPORTED_DECLARATIONS: any[] = [...fromComps.exports, ...fromContainers.exports];

@NgModule({
  imports: [SharedModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS],
})
export class DetailsModule {}
