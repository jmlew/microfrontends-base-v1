import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { EvtBusAction } from './observables.model';

/**
 * A global RxJS Subject based Event Bus through which the shell can co-ordinate actions
 * between itself and its client apps.
 *
 * This is instantiated once as a singleton whose instance is tied to the window object.
 */
export class EvtBusObservables {
  private actionsSubject: BehaviorSubject<EvtBusAction>;

  constructor() {
    this.actionsSubject = new BehaviorSubject<EvtBusAction>(null);
  }

  static getInstance(): EvtBusObservables {
    if (!(window as any).EvtBusObservables) {
      (window as any).EvtBusObservables = new EvtBusObservables();
    }
    return (window as any).EvtBusObservables;
  }

  static unsubscribe(subject: Subject<unknown>) {
    subject.next();
    subject.complete();
  }

  get actions$(): Observable<EvtBusAction> {
    return this.actionsSubject.asObservable();
  }

  dispatchAction(action: EvtBusAction) {
    this.actionsSubject.next(action);
  }
}
