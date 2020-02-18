import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import {
  AppInterfaceFacadeService,
  EvtBusDomService,
  EvtBusObservablesService,
} from '../../../../core/services';
import { AppCommState } from '../../services/app-comm-state.service';
import { CommType } from './../../enums/comm-type.enum';

@Component({
  selector: 'app-comm-to-apps',
  templateUrl: './comm-to-apps.component.html',
})
export class CommToAppsComponent {
  appMessage$: Observable<OrangeAppMessage>;
  commType$: Observable<CommType>;

  constructor(
    private readonly appInterface: AppInterfaceFacadeService,
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService,
    private readonly commState: AppCommState
  ) {
    this.appMessage$ = this.appInterface.appMessage$;
    this.commType$ = this.commState.commType$;
  }

  onMessageToRed(message: string) {
    const data: OrangeAppMessage = {
      fromApp: 'orange',
      message,
    };
    const commType: CommType = this.commState.commTypeValue;
    switch (commType) {
      case CommType.ComponentProp:
        console.log('CommType.ComponentProp WIP...');
        break;
      case CommType.EvtBusDom:
        this.evtBusDom.dispatch(EvtBusEventType.SendClientOrangeMessage, data);
        break;
      case CommType.EvtBusObs:
        this.evtBusObs.dispatch({
          type: EvtBusActionType.SendClientOrangeMessage,
          payload: data,
        });
        break;
    }
  }
}
