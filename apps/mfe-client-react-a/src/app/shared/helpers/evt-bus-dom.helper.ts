import {
  EvtBusDom,
  EvtBusDomImpl,
  EvtBusEventItem,
  EvtBusEventType,
} from '@microfr/shared/util/event-bus-dom';
import { appConfig } from '../constants';
import { appVisibility } from './app-visibility.helper';

class EvtBusDomHelper implements EvtBusDomImpl {
  private evtBus: EvtBusDom;

  constructor() {
    this.evtBus = EvtBusDom.getInstance();
  }

  dispatch(type: EvtBusEventType, detail: any) {
    if (appVisibility.isHidden) {
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

const evtBusDom = new EvtBusDomHelper();
export { evtBusDom };
