import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  ClientApp,
  ClientAppDetails,
  CommType,
} from '@microfr/shared/model/app-interface';
import { PropStringMap } from '@microfr/shared/model/common';
import { IconMat } from '@microfr/shared/ui';
import * as fromConstants from '../../constants';
import { MenuName } from '../../enums/menu.enum';
import { AppMenuStateService } from '../../services';

@Component({
  selector: 'app-comm-to-apps-form',
  templateUrl: './comm-to-apps-form.component.html',
  styleUrls: ['./comm-to-apps-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommToAppsFormComponent {
  @Input() commType: CommType;
  @Output() sendMessage = new EventEmitter<ClientAppDetails>();
  commTypeLabelsMap: PropStringMap = fromConstants.commTypeLabelsMap;

  appName: FormControl = new FormControl(null);
  appDescription: FormControl = new FormControl(null);

  // Const and enums exposed to view.
  IconMat = IconMat;
  MenuName = MenuName;
  ClientApp = ClientApp;

  constructor(private readonly menuState: AppMenuStateService) {}

  onSendToApp(toApp: ClientApp) {
    const data: ClientAppDetails = {
      toApp,
      fromApp: ClientApp.Orange,
      name: this.appName.value,
      description: this.appDescription.value,
    };
    this.sendMessage.emit(data);
  }

  onGoToMenuItem(name: MenuName) {
    this.menuState.setMenuByName(name);
  }
}
