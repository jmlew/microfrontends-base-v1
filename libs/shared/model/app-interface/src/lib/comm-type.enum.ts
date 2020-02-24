export enum CommType {
  EvtBusObs, // Events sent as pseudo-actions to a RxJS Observable stream Event Bus.
  EvtBusDom, // Events sent as DOM API Custom Events Event Bus.
  ComponentProp, // Data sent via properties on the Custom Components app wrappers.
}
