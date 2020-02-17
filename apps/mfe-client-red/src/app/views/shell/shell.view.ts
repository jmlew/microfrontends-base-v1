import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ClientAppInfo } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { takeUntil } from 'rxjs/operators';
import { AppStateManager } from '../../core/services';

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
export class ShellView implements OnDestroy {
  private stateStreamDestroy: Subject<unknown> = new Subject();
  appName: string;

  constructor(private readonly appState: AppStateManager) {
    this.initStateChanges();
  }

  ngOnDestroy() {
    fromCommonUtils.destroy(this.stateStreamDestroy);
  }

  private initStateChanges() {
    this.appState.appInfo$
      .pipe(takeUntil(this.stateStreamDestroy))
      .subscribe((appInfo: ClientAppInfo) => {
        if (appInfo) {
          this.appName = appInfo.name;
        }
      });
  }
}
