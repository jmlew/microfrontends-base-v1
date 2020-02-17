import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { appConfig } from '../constants';
import { EvtBusDomService } from './evt-bus-dom.service';
import { EvtBusObservablesService } from './evt-bus-obs.service';

@Injectable()
export class AppInterfaceFacadeService implements OnDestroy {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  // App state property streams.
  private appMessage: BehaviorSubject<OrangeAppMessage> = new BehaviorSubject(null);

  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  ngOnDestroy() {
    this.evtBusObs.destroy(this.evtBusObsDestroy);
    this.evtBusDom.destroy(this.evtBusDomItems);
  }

  get appMessage$(): Observable<OrangeAppMessage> {
    return this.appMessage.asObservable();
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
          case EvtBusActionType.SendClientOrangeMessage:
            this.appMessage.next(action.payload);
            break;

          default:
            break;
        }
        console.log(`Action to ${appConfig.label}:`, action);
      });
  }

  /**
   * Updates state on DOM API Event Bus Custom Events.
   */
  initEvtBusDom() {
    this.evtBusDom.addEventItem(
      {
        type: EvtBusEventType.SendClientOrangeMessage,
        listener: (event: CustomEvent) => {
          this.appMessage.next(event.detail);
          console.log(`Event to ${appConfig.label}:`, event.detail);
        },
      },
      this.evtBusDomItems
    );
  }
}
