import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';

const EXPORTED_DECLARATIONS: any[] = [HeaderComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [...EXPORTED_DECLARATIONS],
  exports: [...EXPORTED_DECLARATIONS],
})
export class LayoutModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LayoutModule
  ) {
    if (parentModule) {
      throw new Error('LayoutModule is already imported. Import into AppModule only.');
    }
  }
}
