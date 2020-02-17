import { Component } from '@angular/core';

import { AppInterfaceFacadeService } from '../core/services';

@Component({
  styleUrls: ['./app-root.component.scss'],
  templateUrl: './app-root.component.html',
})
export class AppRootComponent {
  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    // Start both alternative global event bus listeners.
    this.appInterface.initEvtBusObs();
    this.appInterface.initEvtBusDom();
  }
}
