import { Component } from '@angular/core';

import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { ElementName } from '@microfr/shell';
import { EvtBusDomService, EvtBusObservablesService } from '../../../../core/services';
import * as fromConstants from '../../constants';
import { MenuItem } from './../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent {
  menuItems: MenuItem[];

  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {
    this.menuItems = fromConstants.menuItems;
  }

  onItemClick(item: MenuItem) {
    this.updateEvtBus(item);
  }

  private updateEvtBus(item: MenuItem) {
    // Get element name from button name.
    const elementName: ElementName = fromConstants.menuToClientElementMap[item.name];
    // Dispatch action to observables-based event bus.
    this.evtBusObs.dispatch({
      type: EvtBusActionType.SelectClient,
      payload: elementName,
    });
    // Dispatch event to DOM-based event bus.
    this.evtBusDom.dispatch(EvtBusEventType.SelectClient, elementName);
  }
}
