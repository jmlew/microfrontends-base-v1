import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { CommType } from '../../features/main/enums/comm-type.enum';
import { appConfig } from '../constants';
import { EvtBusDomService } from './evt-bus-dom.service';
import { EvtBusObservablesService } from './evt-bus-obs.service';

@Injectable()
export class AppInterfaceFacadeService implements OnDestroy {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  // Communication type on which to filter property streams.
  private commType: CommType;

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

  setCommType(commType: CommType) {
    this.commType = commType;
  }

  get appMessage$(): Observable<OrangeAppMessage> {
    return this.appMessage.asObservable();
  }

  get appMessageValue(): OrangeAppMessage {
    return this.appMessage.getValue();
  }

  /**
   * Updates state on subscription to Observables Event Bus actions.
   */
  initEvtBusObs() {
    this.evtBusObs.actions$
      .pipe(
        takeUntil(this.evtBusObsDestroy),
        filter(() => this.commType == null || this.commType === CommType.EvtBusObs)
      )
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
        console.log(`Action received by ${appConfig.label}:`, action);
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
          if (this.commType == null || this.commType === CommType.EvtBusDom) {
            this.appMessage.next(event.detail);
            console.log(`Event received by ${appConfig.label}:`, event.detail);
          }
        },
      },
      this.evtBusDomItems
    );
  }
}
