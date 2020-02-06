import { Observable, Subject } from 'rxjs';

import {
  EvtBusAction,
  EvtBusObservables,
  EvtBusObservablesImpl,
} from '@microfr/shared/util/event-bus-obs';

class EvtBusObservablesHelper implements EvtBusObservablesImpl {
  private evtBus: EvtBusObservables;

  constructor() {
    this.evtBus = EvtBusObservables.getInstance();
  }

  get actions$(): Observable<EvtBusAction> {
    return this.evtBus.actions$;
  }

  destroy(subject: Subject<unknown>) {
    if (subject) {
      EvtBusObservables.unsubscribe(subject);
    }
  }

  dispatch(action: EvtBusAction) {
    this.evtBus.dispatchAction(action);
  }
}

const evtBusObs = new EvtBusObservablesHelper();
export { evtBusObs };
