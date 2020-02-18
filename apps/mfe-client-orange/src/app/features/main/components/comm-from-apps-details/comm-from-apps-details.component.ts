import { Component, Input } from '@angular/core';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
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
export class CommFromAppsDetailsComponent {
  @Input() commType: CommType;
  @Input() appMessage: OrangeAppMessage;

  commTypeLabelsMap: PropStringMap = fromConstants.commTypeLabelsMap;

  // Const and enums exposed to view.
  IconMat = IconMat;
  MenuName = MenuName;

  constructor(private readonly menuState: AppMenuStateService) {}

  onGoToMenuItem(name: MenuName) {
    this.menuState.setMenuByName(name);
  }
}
