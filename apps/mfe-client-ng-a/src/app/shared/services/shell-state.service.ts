import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShellActionsBus, ShellAction } from '@microfr/shell';

@Injectable({ providedIn: 'root' })
export class ShellStateService implements OnDestroy {
  private actionsBus: ShellActionsBus;
  private actionsBusSubs: Subscription;

  constructor() {
    this.actionsBus = ShellActionsBus.getInstance();
    this.initActionsListeners();
  }

  ngOnDestroy() {
    this.actionsBusSubs.unsubscribe();
  }

  private initActionsListeners() {
    this.actionsBusSubs = this.actionsBus.actions$.subscribe((action: ShellAction) => {
      if (action) {
        console.log('Action from Angular Client A:', action);
      }
    });
  }

  dispatch(action: ShellAction) {
    this.actionsBus.dispatch(action);
  }
}
