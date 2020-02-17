import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ClientAppInfo } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { takeUntil } from 'rxjs/operators';
import { AppStateManager } from '../../core/services';

@Component({
  templateUrl: './details.view.html',
})
export class DetailsView implements OnDestroy {
  private stateStreamDestroy: Subject<unknown> = new Subject();
  appDescription: string;

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
          this.appDescription = appInfo.description;
        }
      });
  }
}
