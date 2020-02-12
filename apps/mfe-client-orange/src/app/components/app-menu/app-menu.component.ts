import { Component, OnInit } from '@angular/core';

import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { ElementName } from '@microfr/shell';
import * as fromConstants from '../../constants';
import * as fromServices from '../../services';
import { MenuItem } from './../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  menuItems: MenuItem[];

  constructor(
    private readonly evtBusObservables: fromServices.EvtBusObservablesService,
    private readonly evtBusDom: fromServices.EvtBusDomService
  ) {
    this.menuItems = fromConstants.menuItems;
  }

  ngOnInit() {}

  onItemClick(item: MenuItem) {
    this.updateEvtBus(item);
  }

  private updateEvtBus(item: MenuItem) {
    // Get element name from button name.
    const elementName: ElementName = fromConstants.menuToClientElementMap[item.name];
    // Dispatch action to observables-based event bus.
    this.evtBusObservables.dispatch({
      type: EvtBusActionType.ToggleShowClient,
      payload: elementName,
    });
    // Dispatch event to DOM-based event bus.
    this.evtBusDom.dispatch(EvtBusEventType.ToggleShowClient, elementName);
  }
}
