import { Subscription } from 'rxjs';

import { ShellAction, ShellActionsBus } from '@microfr/shell';

class ShellStateHelper {
  private actionsBus: ShellActionsBus;
  private actionsBusSubs: Subscription;

  constructor() {
    this.actionsBus = ShellActionsBus.getInstance();
    this.initActionsListeners();
  }

  onDestroy() {
    this.actionsBusSubs.unsubscribe();
  }

  private initActionsListeners() {
    this.actionsBusSubs = this.actionsBus.actions$.subscribe((action: ShellAction) => {
      if (action) {
        console.log('Action from React Client A:', action);
      }
    });
  }

  dispatch(action: ShellAction) {
    this.actionsBus.dispatch(action);
  }
}

const shellStateHelper = new ShellStateHelper();
export { shellStateHelper };
