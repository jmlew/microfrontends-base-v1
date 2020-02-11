import { Injectable } from '@angular/core';

import {
  EvtBusDom,
  EvtBusDomImpl,
  EvtBusEventItem,
  EvtBusEventType,
} from '@microfr/shared/util/event-bus-dom';
import { appConfig } from '../constants';
import { AppVisibilityService } from './app-visibility.service';

@Injectable({ providedIn: 'root' })
export class EvtBusDomService implements EvtBusDomImpl {
  private evtBus: EvtBusDom;

  constructor(private readonly appVisibility: AppVisibilityService) {
    this.evtBus = EvtBusDom.getInstance();
  }

  dispatch(type: EvtBusEventType, detail: any) {
    if (this.appVisibility.isHidden) {
      console.warn(`Events blocked from ${appConfig.label} while hidden`);
      return;
    }
    this.evtBus.dispatchEvent(type, detail);
  }

  addEventItem(item: EvtBusEventItem, items: EvtBusEventItem[]) {
    items.push(item);
    this.evtBus.addEventItem(item);
  }

  removeEventItem(item: EvtBusEventItem, items: EvtBusEventItem[]) {
    items = items.filter((element: EvtBusEventItem) => element !== item);
    this.evtBus.removeEventItem(item);
  }

  destroy(items: EvtBusEventItem[]) {
    items.forEach((item: EvtBusEventItem) => this.removeEventItem(item, items));
  }
}
