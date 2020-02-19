import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './../layout/layout.module';
import { EmptyView } from './empty/empty.view';
import { ShellView } from './shell/shell.view';

const EXPORTED_DECLARATIONS: any[] = [EmptyView, ShellView];

@NgModule({
  imports: [RouterModule, SharedModule, LayoutModule],
  declarations: [...EXPORTED_DECLARATIONS],
  exports: [...EXPORTED_DECLARATIONS],
})
export class ViewsModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ViewsModule
  ) {
    if (parentModule) {
      throw new Error('ViewsModule is already imported. Import into AppModule only.');
    }
  }
}
