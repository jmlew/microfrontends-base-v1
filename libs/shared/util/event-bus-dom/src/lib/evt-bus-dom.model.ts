export interface EvtBusEventItem {
  type: EvtBusEventType;
  listener: EventListener;
}

export enum EvtBusEventType {
  ClientIsLoaded = 'Client is Loaded',
  AllClientsAreLoaded = 'All Clients are Loaded',
  ChangeRoute = 'Change Route',
  SelectClient = 'Select Client',
  ChangeClientRedInfo = 'Change Client Red Info',
  ChangeClientBlueInfo = 'Change Client Blue Info',
  SampleEvent = 'Sample Event',
}

export interface EvtBusDomImpl {
  dispatch: (type: EvtBusEventType, detail?: any) => void;
  destroy: (items: EvtBusEventItem[]) => void;
  addEventItem: (item: EvtBusEventItem, items: EvtBusEventItem[]) => void;
  removeEventItem: (item: EvtBusEventItem, items: EvtBusEventItem[]) => void;
}
