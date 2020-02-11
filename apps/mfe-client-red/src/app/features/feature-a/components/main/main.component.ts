import { Component } from '@angular/core';

import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { EvtBusDomService, EvtBusObservablesService } from '../../../../shared/services';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  onFooClick() {
    const sampleEventData = { payload: 'Fired from Angular App A' };
    this.evtBusObs.dispatch({
      type: EvtBusActionType.SampleEvent,
      payload: sampleEventData,
    });
    this.evtBusDom.dispatch(EvtBusEventType.SampleEvent, sampleEventData);
  }
}
