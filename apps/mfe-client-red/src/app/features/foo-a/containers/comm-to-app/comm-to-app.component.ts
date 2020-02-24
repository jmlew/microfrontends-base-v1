import { Component, OnInit } from '@angular/core';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { EvtBusDomService } from '../../../../core/services/evt-bus-dom.service';
import { EvtBusObservablesService } from '../../../../core/services/evt-bus-obs.service';

@Component({
  selector: 'app-comm-to-app',
  templateUrl: './comm-to-app.component.html',
})
export class FooACommToAppComponent implements OnInit {
  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  ngOnInit() {}

  onSendMessage(data: OrangeAppMessage) {
    this.evtBusObs.dispatch({
      type: EvtBusActionType.SendClientOrangeMessage,
      payload: data,
    });
    this.evtBusDom.dispatch(EvtBusEventType.SendClientOrangeMessage, data);
  }
}
