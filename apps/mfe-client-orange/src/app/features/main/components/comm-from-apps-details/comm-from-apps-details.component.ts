import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ClientApp, OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { PropStringMap } from '@microfr/shared/model/common';
import { IconMat } from '@microfr/shared/ui';
import * as fromConstants from '../../constants';
import { CommType } from '../../enums/comm-type.enum';
import { MenuName } from '../../enums/menu.enum';
import { AppMenuStateService } from '../../services';

@Component({
  selector: 'app-comm-from-apps-details',
  templateUrl: './comm-from-apps-details.component.html',
  styleUrls: ['./comm-from-apps-details.component.scss'],
})
export class CommFromAppsDetailsComponent implements OnChanges {
  @Input() commType: CommType;
  @Input() appMessage: OrangeAppMessage;

  appMessages: Array<{ app: ClientApp; data: OrangeAppMessage }>;

  commTypeLabelsMap: PropStringMap = fromConstants.commTypeLabelsMap;

  // Const and enums exposed to view.
  IconMat = IconMat;
  MenuName = MenuName;
  ClientApp = ClientApp;

  constructor(private readonly menuState: AppMenuStateService) {
    this.appMessages = [
      { app: ClientApp.Red, data: null },
      { app: ClientApp.Blue, data: null },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appMessage) {
      this.addAppMessage();
    }
  }

  // TODO: Store incoming messages for each app and display last of each.
  addAppMessage() {}

  onGoToMenuItem(name: MenuName) {
    this.menuState.setMenuByName(name);
  }
}
