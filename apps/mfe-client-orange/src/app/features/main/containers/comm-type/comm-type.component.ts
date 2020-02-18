import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { AppInterfaceFacadeService } from '../../../../core/services';
import { AppCommState } from '../../services/app-comm-state.service';
import { CommType } from './../../enums/comm-type.enum';

@Component({
  selector: 'app-comm-type',
  templateUrl: './comm-type.component.html',
})
export class CommTypeComponent {
  appMessage$: Observable<OrangeAppMessage>;
  commType$: Observable<CommType>;

  constructor(
    private readonly appInterface: AppInterfaceFacadeService,
    private readonly commState: AppCommState
  ) {
    this.appMessage$ = this.appInterface.appMessage$;
    this.commType$ = this.commState.commType$;

    this.onSetCommType(CommType.EvtBusObs);
  }

  onSetCommType(type: CommType) {
    this.commState.setCommType(type);
  }
}
