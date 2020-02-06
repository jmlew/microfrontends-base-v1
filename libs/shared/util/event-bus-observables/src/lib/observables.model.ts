import { Observable, Subject } from 'rxjs';

export interface EvtBusAction {
  type: EvtBusActionType;
  payload?: any;
}

export enum EvtBusActionType {
  ClientIsLoaded = '[Shell] Client is Loaded',
  AllClientsAreLoaded = '[Shell] All Clients are Loaded',
  SampleEvent = '[Global] Sample Event',
}

export interface EvtBusObservablesImpl {
  actions$: Observable<EvtBusAction>;
  dispatch: (action: EvtBusAction) => void;
  destroy: (subject: Subject<unknown>) => void;
}
