import { Component } from '@angular/core';

import { ShellActionType } from '@microfr/shell';
import { ShellStateService } from '../../../../shared/services';

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
