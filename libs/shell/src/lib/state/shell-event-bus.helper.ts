import { BehaviorSubject, Observable } from 'rxjs';

import { ShellAction } from './shell-event-bus.model';

/**
 * A global Event Bus through which the shell can co-ordinate actions between itself and
 * its client apps.
 *
 * This is instantiated once as a singleton whose instance is tied to the window object.
 */
export class ShellActionsBus {
  private actionsSubject: BehaviorSubject<ShellAction> = new BehaviorSubject<ShellAction>(
    null
  );

  get actions$(): Observable<ShellAction> {
    return this.actionsSubject.asObservable();
  }

  get actionsPromise(): Promise<ShellAction> {
    return this.actionsSubject.toPromise();
  }

  static getInstance(): ShellActionsBus {
    if (!(<any>window).ShellActionsBus) {
      (<any>window).ShellActionsBus = new ShellActionsBus();
    }
    return (<any>window).ShellActionsBus;
  }

  dispatch(action: ShellAction) {
    this.actionsSubject.next(action);
  }
}
