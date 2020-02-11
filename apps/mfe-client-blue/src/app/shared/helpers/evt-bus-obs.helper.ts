import { EvtBusObservablesBase } from '@microfr/shared/util/event-bus-obs';
import { appVisibility, AppVisibilityHelper } from './app-visibility.helper';

class EvtBusObservablesHelper extends EvtBusObservablesBase {
  protected readonly appVisibility: AppVisibilityHelper;

  /**
   * Override constructor in order to add appVisibility instantiation to class.
   */
  constructor() {
    super();
    this.appVisibility = appVisibility;
  }
}

const evtBusObs = new EvtBusObservablesHelper();
export { evtBusObs };
