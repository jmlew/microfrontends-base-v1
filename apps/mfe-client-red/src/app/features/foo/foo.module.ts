import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { FooAModule } from './foo-a/foo-a.module';
import { FooBModule } from './foo-b/foo-b.module';

import * as fromComps from './components';
import * as fromViews from './views';

const EXPORTED_DECLARATIONS: any[] = [...fromViews.exports, ...fromComps.exports];
const SUB_MODULES = [FooAModule, FooBModule];

@NgModule({
  imports: [RouterModule, SharedModule],
  exports: [...SUB_MODULES, EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS],
})
export class FooModule {}
