import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PropStringMap } from '@microfr/shared/model/common';
import { IconMat } from '@microfr/shared/ui';
import * as fromConstants from '../../constants';
import { MenuName } from '../../enums/menu.enum';
import { AppMenuStateService } from '../../services';
import { CommType } from './../../enums/comm-type.enum';

@Component({
  selector: 'app-comm-to-apps-form',
  templateUrl: './comm-to-apps-form.component.html',
  styleUrls: ['./comm-to-apps-form.component.scss'],
})
export class CommToAppsFormComponent {
  @Input() commType: CommType;
  @Output() sendMessageToRedApp = new EventEmitter<string>();
  commTypeLabelsMap: PropStringMap = fromConstants.commTypeLabelsMap;

  appRedMessage: FormControl;
  // appBlueMessage: FormControl;

  // Const and enums exposed to view.
  IconMat = IconMat;
  MenuName = MenuName;

  constructor(private readonly menuState: AppMenuStateService) {
    // this.appBlueMessage = new FormControl(null);
    this.appRedMessage = new FormControl(null);
  }

  onSendToRedApp() {
    this.sendMessageToRedApp.emit(this.appRedMessage.value);
  }
  // onSendToBlueApp() {}

  onGoToMenuItem(name: MenuName) {
    this.menuState.setMenuByName(name);
  }
}
