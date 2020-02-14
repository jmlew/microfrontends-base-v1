import { Injectable } from '@angular/core';

import {
  EvtBusObservables,
  EvtBusObservablesBase,
} from '@microfr/shared/util/event-bus-obs';
import { AppVisibilityService } from './app-visibility.service';

@Injectable()
export class EvtBusObservablesService extends EvtBusObservablesBase {
  protected evtBus: EvtBusObservables;

  /**
   * Override constructor in order to add injected appVisibility service to class.
   */
  constructor(protected readonly appVisibility: AppVisibilityService) {
    super();
  }
}
