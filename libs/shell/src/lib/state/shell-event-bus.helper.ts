import { BehaviorSubject, Observable } from 'rxjs';

import { ShellAction } from './shell-event-bus.model';

export class ShellActionsBus {
  private static instance: ShellActionsBus;
  private actionsSubject: BehaviorSubject<ShellAction> = new BehaviorSubject<ShellAction>(
    null
  );
  private registeredClients: HTMLElement[];

  private constructor() {
    this.registeredClients = [];
  }

  registerClient(client: HTMLElement) {
    this.registeredClients = [...this.registeredClients, client];
  }

  get clients(): HTMLElement[] {
    return this.registeredClients;
  }

  get actions$(): Observable<ShellAction> {
    return this.actionsSubject.asObservable();
  }

  get actionsPromise(): Promise<ShellAction> {
    return this.actionsSubject.toPromise();
  }

  static getInstance(): ShellActionsBus {
    if (!ShellActionsBus.instance) {
      ShellActionsBus.instance = new ShellActionsBus();
    }

    return ShellActionsBus.instance;
  }

  dispatch(action: ShellAction) {
    this.actionsSubject.next(action);
  }
}
