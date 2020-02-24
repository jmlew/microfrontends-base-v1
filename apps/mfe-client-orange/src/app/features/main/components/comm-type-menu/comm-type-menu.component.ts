import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { CommType } from '@microfr/shared/model/app-interface';
import { PropStringMap } from '@microfr/shared/model/common';
import * as fromConstants from '../../constants';

@Component({
  selector: 'app-comm-type-menu',
  templateUrl: './comm-type-menu.component.html',
  styleUrls: ['./comm-type-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommTypeMenuComponent {
  @Input() commType: CommType;
  @Output() selectCommType = new EventEmitter<CommType>();

  commTypes: CommType[] = [
    CommType.ComponentProp,
    CommType.EvtBusDom,
    CommType.EvtBusObs,
  ];
  commTypeLabelsMap: PropStringMap = fromConstants.commTypeLabelsMap;

  onSelectCommType(change: MatRadioChange) {
    this.selectCommType.emit(change.value as CommType);
  }
}
