import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  EvtBusAction,
  EvtBusObservables,
  EvtBusObservablesImpl,
} from '@microfr/shared/util/event-bus-obs';
import { appConfig } from '../constants';
import { AppVisibilityService } from './app-visibility.service';

@Injectable({ providedIn: 'root' })
export class EvtBusObservablesService implements EvtBusObservablesImpl {
  private evtBus: EvtBusObservables;

  constructor(private readonly appVisibility: AppVisibilityService) {
    this.evtBus = EvtBusObservables.getInstance();
  }

  /**
   * Returns the evt bus actions stream if the app is currently visible.
   */
  get actions$(): Observable<EvtBusAction> {
    return this.evtBus.actions$.pipe(filter(() => !this.appVisibility.isHidden));
  }

  dispatch(action: EvtBusAction) {
    if (this.appVisibility.isHidden) {
      console.warn(`Actons blocked from ${appConfig.label} while hidden`);
      return;
    }
    this.evtBus.dispatchAction(action);
  }

  destroy(subject: Subject<unknown>) {
    if (subject) {
      EvtBusObservables.unsubscribe(subject);
    }
  }
}
