import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { destroy } from '@microfr/shared/util/common';
import { AppInterfaceFacadeService } from '../../../core/services';
import { CommType } from '../enums/comm-type.enum';

@Injectable()
export class AppCommState implements OnDestroy {
  private unsubscribe: Subject<unknown> = new Subject();

  // State property streams.
  private commType: BehaviorSubject<CommType> = new BehaviorSubject(
    CommType.ComponentProp
  );

  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    this.syncCommTypeToAppInterface();
  }

  private syncCommTypeToAppInterface() {
    this.commType$.subscribe((commType: CommType) => {
      this.appInterface.setCommType(commType);
    });
  }

  ngOnDestroy() {
    destroy(this.unsubscribe);
  }

  get commType$(): Observable<CommType> {
    return this.commType.asObservable().pipe(takeUntil(this.unsubscribe));
  }

  get commTypeValue(): CommType {
    return this.commType.getValue();
  }

  setCommType(type: CommType) {
    this.commType.next(type);
  }
}
