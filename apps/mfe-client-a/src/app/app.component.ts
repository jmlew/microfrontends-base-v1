import { Component, OnInit } from '@angular/core';

import * as fromSharedUi from '@microfr/shared/ui';
import * as fromSharedUtils from '@microfr/shared/utils';

@Component({
  // selector: 'client-a', Element name is defined in customElements.define.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const uiFoo: string = fromSharedUi.getFoo();
    const utilsFoo: string = fromSharedUtils.getFoo();
    console.log('Client A :', uiFoo);
    console.log('Client A :', utilsFoo);
  }
}
