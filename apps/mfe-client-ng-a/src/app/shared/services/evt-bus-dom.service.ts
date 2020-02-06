import { Injectable, OnDestroy } from '@angular/core';

import {
  EvtBusDom,
  EvtBusDomImpl,
  EvtBusEventItem,
  EvtBusEventType,
} from '@microfr/shared/util/event-bus-dom';

@Injectable({ providedIn: 'root' })
export class EvtBusDomService implements EvtBusDomImpl {
  private evtBus: EvtBusDom;

  constructor() {
    this.evtBus = EvtBusDom.getInstance();
  }

  dispatch(type: EvtBusEventType, detail: any) {
    this.evtBus.dispatchEvent(type, detail);
  }

  addEventListener(item: EvtBusEventItem, items: EvtBusEventItem[]) {
    items.push(item);
    this.evtBus.addEventListener(item);
  }

  removeEventListener(item: EvtBusEventItem, items: EvtBusEventItem[]) {
    items = items.filter((element: EvtBusEventItem) => element !== item);
    this.evtBus.removeEventListener(item);
  }

  destroy(items: EvtBusEventItem[]) {
    items.forEach((item: EvtBusEventItem) => this.removeEventListener(item, items));
  }
}
