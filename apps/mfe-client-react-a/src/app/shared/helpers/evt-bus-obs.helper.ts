import { Observable, Subject } from 'rxjs';

import {
  EvtBusAction,
  EvtBusObservables,
  EvtBusObservablesImpl,
} from '@microfr/shared/util/event-bus-obs';
import { filter } from 'rxjs/operators';
import { appConfig } from '../constants';
import { appVisibility } from './app-visibility.helper';

class EvtBusObservablesHelper implements EvtBusObservablesImpl {
  private evtBus: EvtBusObservables;

  constructor() {
    this.evtBus = EvtBusObservables.getInstance();
  }

  /**
   * Returns the evt bus actions stream if the app is currently visible.
   */
  get actions$(): Observable<EvtBusAction> {
    return this.evtBus.actions$.pipe(filter(() => !appVisibility.isHidden));
  }

  dispatch(action: EvtBusAction) {
    if (appVisibility.isHidden) {
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

const evtBusObs = new EvtBusObservablesHelper();
export { evtBusObs };
