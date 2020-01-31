import { Component } from '@angular/core';

import { ShellStateService } from '../../../../shared/services';
import { ShellActionType } from '@microfr/shell';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private readonly shellState: ShellStateService) {}

  onFooClick() {
    this.shellState.dispatch({
      type: ShellActionType.Bar,
      payload: 'Fired from Angular App A',
    });
  }
}
