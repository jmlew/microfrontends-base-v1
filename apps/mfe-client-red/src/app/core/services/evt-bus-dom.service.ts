import { Injectable } from '@angular/core';

import { EvtBusDomBase } from '@microfr/shared/util/event-bus-dom';
import { AppVisibilityService } from './app-visibility.service';

@Injectable()
export class EvtBusDomService extends EvtBusDomBase {
  /**
   * Override constructor in order to add injected appVisibility service to class.
   */
  constructor(protected readonly appVisibility: AppVisibilityService) {
    super();
  }
}
