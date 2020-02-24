import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import { filter, map } from 'rxjs/operators';
import { AppInterfaceFacadeService } from '../../core/services';

/**
 * Shell component defines the top-level app structure. This markup is often defined in
 * the app-root component, but is instead placed into a separate view to allow for the
 * app's contents to be 'destroyed' on given routes when used within a micro-frontends
 * architecture.
 */
@Component({
  templateUrl: './shell.view.html',
  styleUrls: ['./shell.view.scss'],
})
export class ShellView {
  appName$: Observable<string>;
  appDescription$: Observable<string>;

  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    this.appName$ = this.appInterface.appDetails$.pipe(
      filter((details: ClientAppDetails) => details != null),
      map((details: ClientAppDetails) => details.name)
    );

    this.appDescription$ = this.appInterface.appDetails$.pipe(
      filter((details: ClientAppDetails) => details != null),
      map((details: ClientAppDetails) => details.description)
    );
  }
}
