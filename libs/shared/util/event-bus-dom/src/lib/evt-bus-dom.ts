import { EvtBusEventItem, EvtBusEventType } from './evt-bus-dom.model';

/**
 * A global DOM API Custom Event based Event Bus through which the shell can co-ordinate
 * events between itself and its client apps.
 *
 * This is instantiated once as a singleton whose instance is tied to the window object.
 */
export class EvtBusDom {
  private bus: HTMLElement;

  constructor() {
    this.bus = document.createElement('global-evt-bus');
  }

  static getInstance(): EvtBusDom {
    if (!(window as any).EvtBusDom) {
      (window as any).EvtBusDom = new EvtBusDom();
    }
    return (window as any).EvtBusDom;
  }

  addEventItem(item: EvtBusEventItem) {
    const { type, listener } = item;
    this.bus.addEventListener(type, listener);
  }

  removeEventItem(item: EvtBusEventItem) {
    const { type, listener } = item;
    this.bus.removeEventListener(type, listener);
  }

  dispatchEvent(type: EvtBusEventType, detail: any) {
    this.bus.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
