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

import { AppRootProps } from '../../root/AppRoot';
import { appConfig } from '../constants';
import { appVisibility } from './app-visibility.helper';
import { evtBusDom } from './evt-bus-dom.helper';
import { evtBusObs } from './evt-bus-obs.helper';

class AppInterfaceFacadeHelper {
  private appInputObsDestroy: Subject<unknown> = new Subject();
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  // App state property streams.
  private appDetails: BehaviorSubject<ClientAppDetails> = new BehaviorSubject(null);

  destroy() {
    fromCommonUtils.destroy(this.appInputObsDestroy);
    evtBusObs.destroy(this.evtBusObsDestroy);
    evtBusDom.destroy(this.evtBusDomItems);
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
  handleInputProperyChanges(nextProps: AppRootProps, prevProps: AppRootProps) {
    if (
      nextProps.appDetails &&
      (prevProps == null || nextProps.appDetails !== prevProps.appDetails)
    ) {
      this.appDetails.next(nextProps.appDetails);
      this.logData(CommType.ComponentProp, nextProps.appDetails);
    }
  }

  /**
   * Updates state on subscription to Observables Event Bus actions.
   */
  initEvtBusObs() {
    evtBusObs.actions$
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
        }
      });
  }

  /**
   * Updates state on DOM API Event Bus Custom Events.
   */
  initEvtBusDom() {
    evtBusDom.addEventItem(
      {
        type: EvtBusEventType.ChangeClientInfo,
        listener: (event: CustomEvent) => {
          const data: ClientAppDetails = event.detail;
          if (!appVisibility.isHidden && this.isDestinationAppValid(data)) {
            this.appDetails.next(data);
            this.logData(CommType.EvtBusDom, event.detail);
          }
        },
      },
      this.evtBusDomItems
    );
  }

  private isSourceAppValid(data: ClientAppMessage): boolean {
    return data.fromApp !== ClientApp.Blue;
  }

  private isDestinationAppValid(data: ClientAppMessage): boolean {
    return data.toApp === ClientApp.Blue;
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

const appInterface = new AppInterfaceFacadeHelper();
export { appInterface };
