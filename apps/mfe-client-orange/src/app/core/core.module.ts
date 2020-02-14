import { NgModule, Optional, SkipSelf } from '@angular/core';

import * as fromServices from './services';

const EXPORTED_PROVIDERS: any[] = [...fromServices.exports];

@NgModule({
  imports: [],
  exports: [],
  providers: [EXPORTED_PROVIDERS],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already imported. Import into AppModule only.');
    }
  }
}
