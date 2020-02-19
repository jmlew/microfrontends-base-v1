import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  ClientApp,
  ClientAppMessage,
  OrangeAppMessage,
} from '@microfr/shared/model/app-interface';
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
        filter(() => this.isCommTypeValid(CommType.EvtBusObs))
      )
      .subscribe((action: EvtBusAction) => {
        if (!action) {
          return;
        }
        switch (action.type) {
          case EvtBusActionType.SendClientOrangeMessage:
            const data: OrangeAppMessage = action.payload;
            if (this.isSourceAppValid(data)) {
              this.appMessage.next(action.payload);
              console.log(`Action received by ${appConfig.label}:`, action);
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
        type: EvtBusEventType.SendClientOrangeMessage,
        listener: (event: CustomEvent) => {
          if (!this.isCommTypeValid(CommType.EvtBusDom)) {
            return;
          }
          const data: OrangeAppMessage = event.detail;
          if (!this.isSourceAppValid(data)) {
            return;
          }
          this.appMessage.next(event.detail);
          console.log(`Event received by ${appConfig.label}:`, event.detail);
        },
      },
      this.evtBusDomItems
    );
  }

  private isCommTypeValid(commType: CommType): boolean {
    return this.commType == null || this.commType === commType;
  }

  private isSourceAppValid(data: ClientAppMessage): boolean {
    return data.fromApp !== ClientApp.Orange;
  }
}
