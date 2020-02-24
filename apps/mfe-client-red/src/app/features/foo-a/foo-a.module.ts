import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import * as fromComps from './components';
import * as fromContainers from './containers';
import * as fromViews from './views';

const EXPORTED_DECLARATIONS: any[] = [
  ...fromViews.exports,
  ...fromContainers.exports,
  ...fromComps.exports,
];

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [EXPORTED_DECLARATIONS],
  exports: [EXPORTED_DECLARATIONS],
  providers: [],
})
export class FooAModule {}
