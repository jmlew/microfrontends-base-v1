export interface EvtBusEventItem {
  type: EvtBusEventType;
  listener: EventListener;
}

export enum EvtBusEventType {
  ClientIsLoaded = '[Shell] Client is Loaded',
  AllClientsAreLoaded = '[Shell] All Clients are Loaded',
  ToggleShowClient = '[Client] Toggle Show Client',
  SampleEvent = '[Global] Sample Event',
}

export interface EvtBusDomImpl {
  dispatch: (type: EvtBusEventType, detail?: any) => void;
  destroy: (items: EvtBusEventItem[]) => void;
  addEventItem: (item: EvtBusEventItem, items: EvtBusEventItem[]) => void;
  removeEventItem: (item: EvtBusEventItem, items: EvtBusEventItem[]) => void;
}
