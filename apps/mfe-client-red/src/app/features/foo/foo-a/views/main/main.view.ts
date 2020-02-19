import { Component, OnInit } from '@angular/core';

import { ClientApp, OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { EvtBusDomService } from '../../../../../core/services/evt-bus-dom.service';
import { EvtBusObservablesService } from '../../../../../core/services/evt-bus-obs.service';

@Component({
  templateUrl: './main.view.html',
  styleUrls: ['./main.view.scss'],
})
export class FooAMainView implements OnInit {
  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  ngOnInit() {}

  onOrangeAppMessageClick() {
    const data: OrangeAppMessage = {
      fromApp: ClientApp.Red,
      toApp: ClientApp.Orange,
      message: 'Red App says hello!',
    };
    this.evtBusObs.dispatch({
      type: EvtBusActionType.SendClientOrangeMessage,
      payload: data,
    });
    this.evtBusDom.dispatch(EvtBusEventType.SendClientOrangeMessage, data);
  }
}
