export interface EvtBusEventItem {
  type: EvtBusEventType;
  listener: EventListener;
}

export enum EvtBusEventType {
  ClientIsLoaded = '[Shell] Client is Loaded',
  AllClientsAreLoaded = '[Shell] All Clients are Loaded',
  SampleEvent = '[Global] Sample Event',
}

export interface EvtBusDomImpl {
  dispatch: (type: EvtBusEventType, detail?: any) => void;
  destroy: (items: EvtBusEventItem[]) => void;
  addEventListener: (item: EvtBusEventItem, items: EvtBusEventItem[]) => void;
  removeEventListener: (item: EvtBusEventItem, items: EvtBusEventItem[]) => void;
}
