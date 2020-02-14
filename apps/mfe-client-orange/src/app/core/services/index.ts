import { AppVisibilityService } from './app-visibility.service';
import { EvtBusDomService } from './evt-bus-dom.service';
import { EvtBusObservablesService } from './evt-bus-obs.service';

// Exported collection for cases where services are provided at the module level, as
// opposed via the providedIn prop of the @Injectable service decorator.
export const exports: any[] = [
  AppVisibilityService,
  EvtBusDomService,
  EvtBusObservablesService,
];

export * from './evt-bus-obs.service';
export * from './evt-bus-dom.service';
export * from './app-visibility.service';
