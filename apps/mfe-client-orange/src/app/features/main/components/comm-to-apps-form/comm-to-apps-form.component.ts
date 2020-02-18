import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PropStringMap } from '@microfr/shared/model/common';
import * as fromConstants from '../../constants';
import { CommType } from './../../enums/comm-type.enum';

@Component({
  selector: 'app-comm-to-apps-form',
  templateUrl: './comm-to-apps-form.component.html',
  styleUrls: ['./comm-to-apps-form.component.scss'],
})
export class CommToAppsFormComponent {
  @Input() commType: CommType;
  commTypeLabelsMap: PropStringMap = fromConstants.commTypeLabelsMap;
}
