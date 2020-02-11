import { EvtBusObservablesBase } from '@microfr/shared/util/event-bus-obs';

class EvtBusObservablesHelper extends EvtBusObservablesBase {}

const evtBusObs = new EvtBusObservablesHelper();
export { evtBusObs };
