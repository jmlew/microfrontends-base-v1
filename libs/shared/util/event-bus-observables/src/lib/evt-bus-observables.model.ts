import { Observable, Subject } from 'rxjs';

export interface EvtBusAction {
  type: EvtBusActionType;
  payload?: any;
}

export enum EvtBusActionType {
  ClientIsLoaded = 'Client is Loaded',
  AllClientsAreLoaded = 'All Clients are Loaded',
  ChangeRoute = 'Change Route',
  SelectClient = 'Select Client',
  ChangeClientRedLabel = 'Change Client Red Label',
  ChangeClientBlueLabel = 'Change Client Blue Label',
  SampleAction = 'Sample Action',
}

export interface EvtBusObservablesImpl {
  actions$: Observable<EvtBusAction>;
  dispatch: (action: EvtBusAction) => void;
  destroy: (subject: Subject<unknown>) => void;
}
