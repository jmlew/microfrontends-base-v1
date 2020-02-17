import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppVisibility, destroy } from '@microfr/shared/util/common';
import { EvtBusObservables } from './evt-bus-observables';
import { EvtBusAction, EvtBusObservablesImpl } from './evt-bus-observables.model';

export class EvtBusObservablesBase implements EvtBusObservablesImpl {
  protected evtBus: EvtBusObservables;
  protected appVisibility: AppVisibility;

  constructor() {
    this.evtBus = EvtBusObservables.getInstance();
  }

  /**
   * Returns the evt bus actions stream if the app is currently visible.
   */
  get actions$(): Observable<EvtBusAction> {
    return this.appVisibility
      ? this.evtBus.getActions().pipe(filter(() => !this.appVisibility.isHidden))
      : this.evtBus.getActions();
  }

  dispatch(action: EvtBusAction) {
    if (this.appVisibility && this.appVisibility.isHidden) {
      return;
    }
    this.evtBus.dispatchAction(action);
  }

  destroy(subject: Subject<unknown>) {
    destroy(subject);
  }
}
