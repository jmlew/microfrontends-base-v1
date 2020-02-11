import { AppVisibility } from '@microfr/shared/util/common';
import { EvtBusDomImpl, EvtBusEventItem, EvtBusEventType } from './com-evt.model';
import { EvtBusDom } from './evt-bus-dom';

export class EvtBusDomBase implements EvtBusDomImpl {
  protected evtBus: EvtBusDom;
  protected appVisibility: AppVisibility;

  constructor() {
    this.evtBus = EvtBusDom.getInstance();
  }

  dispatch(type: EvtBusEventType, detail: any) {
    if (this.appVisibility && this.appVisibility.isHidden) {
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
