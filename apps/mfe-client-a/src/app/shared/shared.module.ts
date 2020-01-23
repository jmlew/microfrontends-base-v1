import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UiMatModule } from '@microfr/shared/ui-angular';
import * as fromComponents from './components';
import * as fromDirectives from './directives';
import * as fromGuards from './guards';
import * as fromServices from './services';

const modules = [CommonModule, UiMatModule, FlexLayoutModule];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...fromComponents.exports, ...fromDirectives.exports],
  declarations: [...fromComponents.exports, ...fromDirectives.exports],
  providers: [...fromServices.exports, ...fromGuards.exports],
})
export class SharedModule {}
