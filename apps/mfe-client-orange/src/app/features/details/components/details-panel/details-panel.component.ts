import { Component, Input } from '@angular/core';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
})
export class AppDetailsPanelComponent {
  @Input() appMessage: OrangeAppMessage;
}
