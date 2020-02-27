import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ClientApp, OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { EvtBusDomService } from '../../../../core/services/evt-bus-dom.service';
import { EvtBusObservablesService } from '../../../../core/services/evt-bus-obs.service';

@Component({
  selector: 'app-comm-to-app',
  templateUrl: './comm-to-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooACommToAppComponent implements OnInit {
  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  ngOnInit() {}

  onSendMessage(message: string) {
    const data: OrangeAppMessage = {
      fromApp: ClientApp.Red,
      toApp: ClientApp.Orange,
      message,
    };

    this.evtBusObs.dispatch({
      type: EvtBusActionType.SendClientOrangeMessage,
      payload: data,
    });
    this.evtBusDom.dispatch(EvtBusEventType.SendClientOrangeMessage, data);
  }
}
