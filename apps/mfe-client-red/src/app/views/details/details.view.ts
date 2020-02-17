import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { takeUntil } from 'rxjs/operators';
import { AppInterfaceFacadeService } from '../../core/services';

@Component({
  templateUrl: './details.view.html',
})
export class DetailsView implements OnDestroy {
  private stateStreamDestroy: Subject<unknown> = new Subject();
  appDescription: string;

  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    this.initStateChanges();
  }

  ngOnDestroy() {
    fromCommonUtils.destroy(this.stateStreamDestroy);
  }

  private initStateChanges() {
    this.appInterface.appDetails$
      .pipe(takeUntil(this.stateStreamDestroy))
      .subscribe((appDetails: ClientAppDetails) => {
        if (appDetails) {
          this.appDescription = appDetails.description;
        }
      });
  }
}
