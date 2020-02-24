import { Injectable, OnDestroy, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import {
  ClientApp,
  ClientAppDetails,
  ClientAppMessage,
  CommType,
} from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { appConfig } from '../constants';
import { AppVisibilityService } from './app-visibility.service';
import { EvtBusDomService } from './evt-bus-dom.service';
import { EvtBusObservablesService } from './evt-bus-obs.service';

@Injectable()
export class AppInterfaceFacadeService implements OnDestroy {
  private appInputObsDestroy: Subject<unknown> = new Subject();
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  // App state property streams.
  private appDetails: BehaviorSubject<ClientAppDetails> = new BehaviorSubject(null);

  constructor(
    private readonly appVisibility: AppVisibilityService,
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  ngOnDestroy() {
    fromCommonUtils.destroy(this.appInputObsDestroy);
    this.evtBusObs.destroy(this.evtBusObsDestroy);
    this.evtBusDom.destroy(this.evtBusDomItems);
  }

  get appDetails$(): Observable<ClientAppDetails> {
    return this.appDetails.asObservable().pipe(distinctUntilChanged());
  }

  get appDetailsValue(): ClientAppDetails {
    return this.appDetails.getValue();
  }

  /**
   * Updates state on changes on the app root element input property / attribute.
   */
  handleInputProperyChanges(changes: SimpleChanges) {
    if (
      changes.appDetails &&
      changes.appDetails.currentValue !== changes.appDetails.previousValue
    ) {
      this.appDetails.next(changes.appDetails.currentValue);
      this.logData(CommType.ComponentProp, changes);
    }
  }

  /**
   * Updates state on subscription to Observables Event Bus actions.
   */
  initEvtBusObs() {
    this.evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (!action) {
          return;
        }
        switch (action.type) {
          case EvtBusActionType.ChangeClientInfo:
            const data: ClientAppDetails = action.payload;
            if (this.isDestinationAppValid(data)) {
              this.appDetails.next(data);
              this.logData(CommType.EvtBusObs, data);
            }
            break;

          default:
            break;
        }
      });
  }

  /**
   * Updates state on DOM API Event Bus Custom Events.
   */
  initEvtBusDom() {
    this.evtBusDom.addEventItem(
      {
        type: EvtBusEventType.ChangeClientInfo,
        listener: (event: CustomEvent) => {
          const data: ClientAppDetails = event.detail;
          if (!this.appVisibility.isHidden && this.isDestinationAppValid(data)) {
            this.appDetails.next(data);
            this.logData(CommType.EvtBusDom, event.detail);
          }
        },
      },
      this.evtBusDomItems
    );
  }

  private isSourceAppValid(data: ClientAppMessage): boolean {
    return data.fromApp !== ClientApp.Red;
  }

  private isDestinationAppValid(data: ClientAppMessage): boolean {
    return data.toApp === ClientApp.Red;
  }

  private logData(commType: CommType, data: any) {
    switch (commType) {
      case CommType.EvtBusObs:
        console.log(`Action received by ${appConfig.label}:`, data);
        break;
      case CommType.EvtBusDom:
        console.log(`Event received by ${appConfig.label}:`, data);
        break;
      case CommType.ComponentProp:
        console.log(`App input changes on ${appConfig.label}: `, data);
        break;
    }
  }
}
