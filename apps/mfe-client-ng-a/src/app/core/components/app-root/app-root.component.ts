import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientAppInfo } from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { appConfig } from '../../../shared/constants';
import { EvtBusDomService, EvtBusObservablesService } from '../../../shared/services';

@Component({
  // selector: 'mfe-client-ng-a', // Element name defined as custom element on ngDoBootstrap.
  template: `
    <div class="mat-typography">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppRootComponent implements OnInit, OnDestroy, OnChanges {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  @Input() appInfo: ClientAppInfo;

  constructor(
    private readonly router: Router,
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {}

  ngOnInit() {
    // Bootstrapping components as Web Components requires manual router initializion.
    this.router.initialNavigation();

    this.listenToEvtBusObs();
    this.listenToEvtBusDom();
  }

  ngOnDestroy() {
    this.evtBusObs.destroy(this.evtBusObsDestroy);
    this.evtBusDom.destroy(this.evtBusDomItems);
  }

  private listenToEvtBusDom() {
    this.evtBusDom.addEventListener(
      {
        type: EvtBusEventType.SampleEvent,
        listener: (event: CustomEvent) => {
          console.log(`Event to ${appConfig.label}:`, event.detail);
        },
      },
      this.evtBusDomItems
    );
  }

  private listenToEvtBusObs() {
    this.evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action && action.type === EvtBusActionType.SampleEvent) {
          console.log(`Action to ${appConfig.label}:`, action);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`changes on ${appConfig.label}: `, changes);
  }
}
