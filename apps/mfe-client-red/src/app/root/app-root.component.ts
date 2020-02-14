import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientAppElement, ClientAppInfo } from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { isAppShown, isMutationAttributeHidden } from '@microfr/shell';
import { appConfig } from '../shared/constants';
import {
  AppVisibilityService,
  EvtBusDomService,
  EvtBusObservablesService,
} from '../shared/services';

/**
 * Avoid layout in the root component and rely only on the routes config to determine
 * which view is shown. This enables the app to disappear with the empty component on
 * specific top-level routes if required.
 */
@Component({
  styleUrls: ['./app-root.component.scss'],
  // selector: 'mfe-client-red', // Element name defined as custom element on ngDoBootstrap.
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppRootComponent implements OnInit, OnDestroy, OnChanges {
  private nativeElement: ClientAppElement;
  private observer: MutationObserver;
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  @Input() appInfo: ClientAppInfo;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly router: Router,
    private readonly appVisibility: AppVisibilityService,
    private readonly evtBusObs: EvtBusObservablesService,
    private readonly evtBusDom: EvtBusDomService
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.initMutationObserver();
  }

  ngOnInit() {
    this.observeMutations();

    // Bootstrapping components as Web Components requires manual router initializion.
    this.router.initialNavigation();

    // Start both alternative global event bus listeners.
    this.listenToEvtBusObs();
    this.listenToEvtBusDom();
  }

  ngOnDestroy() {
    this.observeMutations(false);
    this.evtBusObs.destroy(this.evtBusObsDestroy);
    this.evtBusDom.destroy(this.evtBusDomItems);
  }

  /**
   * Observes changes to property inputs from shell to client.
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log(`changes on ${appConfig.label}: `, changes);
  }

  /**
   * Initialises DOM MutationObserver to observe changes to element visibility.
   */
  private initMutationObserver() {
    this.observer = new MutationObserver(this.handleMutationChanges.bind(this));
  }

  /**
   * Starts or stops observing DOM mutations.
   */
  private observeMutations(isObserve: boolean = true) {
    isObserve
      ? this.observer.observe(this.nativeElement, {
          attributes: true,
          attributeOldValue: true,
        })
      : this.observer.disconnect();
  }

  /**
   * Observes DOM mutations on the native element and sets the apps state accoring to the
   * element's visible status.
   */
  private handleMutationChanges(mutations: MutationRecord[]) {
    const isHiddenChanged: boolean = mutations.some(isMutationAttributeHidden);
    if (isHiddenChanged) {
      const isShown: boolean = isAppShown(this.nativeElement);
      this.appVisibility.isHidden = !isShown;
      console.log(`isShown ${appConfig.label}: `, isShown);
    }
  }

  private listenToEvtBusDom() {
    const listener: EventListener = (event: CustomEvent) => {
      if (!this.appVisibility.isHidden) {
        console.log(`Event to ${appConfig.label}:`, event.detail);
      }
    };
    this.evtBusDom.addEventItem(
      { type: EvtBusEventType.SampleEvent, listener },
      this.evtBusDomItems
    );
  }

  private listenToEvtBusObs() {
    this.evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action) {
          console.log(`Action to ${appConfig.label}:`, action);
        }
      });
  }
}
