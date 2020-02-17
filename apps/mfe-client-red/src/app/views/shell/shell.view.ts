import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { takeUntil } from 'rxjs/operators';
import { EvtBusDomService, EvtBusObservablesService } from '../../core/services';

/**
 * Shell component defines the top-level app structure. This markup is often defined in
 * the app-root component, but is instead placed into a separate view to allow for the
 * app's contents to be 'destroyed' on given routes when used within a micro-frontends
 * architecture.
 */
@Component({
  templateUrl: './shell.view.html',
  styleUrls: ['./shell.view.scss'],
})
export class ShellView implements OnDestroy {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  appName = 'Red Client App';
  appLabel: string;

  constructor(
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {
    this.listenToLabelChanges();
  }

  ngOnDestroy() {
    this.evtBusObs.destroy(this.evtBusObsDestroy);
    this.evtBusDom.destroy(this.evtBusDomItems);
  }

  private listenToLabelChanges() {
    // Showcase listening to Evt Bus Observables.
    this.evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action && action.type === EvtBusActionType.ChangeClientRedLabel) {
          this.changeLabel(action.payload);
        }
      });

    // Showcase listening to Evt Bus DOM Custom Events.
    this.evtBusDom.addEventItem(
      {
        type: EvtBusEventType.ChangeClientRedLabel,
        listener: (event: CustomEvent) => {
          this.changeLabel(event.detail);
        },
      },
      this.evtBusDomItems
    );
  }

  private changeLabel(label: string) {
    this.appLabel = label;
  }
}
