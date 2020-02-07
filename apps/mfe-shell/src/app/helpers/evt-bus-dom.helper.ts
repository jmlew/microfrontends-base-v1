import {
  EvtBusDom,
  EvtBusDomImpl,
  EvtBusEventItem,
  EvtBusEventType,
} from '@microfr/shared/util/event-bus-dom';

class EvtBusDomHelper implements EvtBusDomImpl {
  private evtBus: EvtBusDom;

  constructor() {
    this.evtBus = EvtBusDom.getInstance();
  }

  dispatch(type: EvtBusEventType, detail: any) {
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

const evtBusDom = new EvtBusDomHelper();
export { evtBusDom };
