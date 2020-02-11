import { EvtBusDomBase } from '@microfr/shared/util/event-bus-dom';
import { appVisibility, AppVisibilityHelper } from './app-visibility.helper';

class EvtBusDomHelper extends EvtBusDomBase {
  protected readonly appVisibility: AppVisibilityHelper;

  /**
   * Override constructor in order to add appVisibility instantiation to class.
   */
  constructor() {
    super();
    this.appVisibility = appVisibility;
  }
}

const evtBusDom = new EvtBusDomHelper();
export { evtBusDom };
