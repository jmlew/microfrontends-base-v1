import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UiMatModule } from '@microfr/shared/ui-angular';

const EXPORTED_DECLARATIONS: any[] = [];
const EXPORTED_PROVIDERS: any[] = [];
const EXPORTED_MODULES: any[] = [CommonModule, UiMatModule, FlexLayoutModule];

@NgModule({
  imports: [...EXPORTED_MODULES],
  exports: [...EXPORTED_MODULES, ...EXPORTED_DECLARATIONS],
  declarations: [...EXPORTED_DECLARATIONS],
  providers: [EXPORTED_PROVIDERS],
})
export class SharedModule {}
