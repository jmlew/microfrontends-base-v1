import { Injectable, OnDestroy, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
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
    return this.appDetails.asObservable();
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
    }
    console.log(`App input changes on ${appConfig.label}: `, changes);
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
          case EvtBusActionType.ChangeClientRedInfo:
            this.appDetails.next(action.payload);
            break;

          default:
            break;
        }
        console.log(`Action received by ${appConfig.label}:`, action);
      });
  }

  /**
   * Updates state on DOM API Event Bus Custom Events.
   */
  initEvtBusDom() {
    this.evtBusDom.addEventItem(
      {
        type: EvtBusEventType.ChangeClientRedInfo,
        listener: (event: CustomEvent) => {
          if (!this.appVisibility.isHidden) {
            this.appDetails.next(event.detail);

            console.log(`Event received by ${appConfig.label}:`, event.detail);
          }
        },
      },
      this.evtBusDomItems
    );
  }
}
