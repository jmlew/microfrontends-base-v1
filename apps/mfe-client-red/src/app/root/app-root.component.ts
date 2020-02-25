import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { ClientAppDetails, ClientAppElement } from '@microfr/shared/model/app-interface';
import { isAppShown, isMutationAttributeHidden } from '@microfr/shell';
import { appConfig } from '../core/constants';
import { AppInterfaceFacadeService, AppVisibilityService } from '../core/services';

/**
 * Avoid layout in the root component and rely only on the routes config to determine
 * which view is shown. This enables the app to disappear with the empty component on
 * specific top-level routes if required.
 */
@Component({
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppRootComponent implements OnInit, OnDestroy, OnChanges {
  private nativeElement: ClientAppElement;
  private observer: MutationObserver;

  // Custom element properties as inputs.
  @Input() appDetails: ClientAppDetails;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly router: Router,
    private readonly appInterface: AppInterfaceFacadeService,
    private readonly appVisibility: AppVisibilityService
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.initMutationObserver();
  }

  ngOnInit() {
    // Bootstrapping components as Web Components requires manual router initializion.
    this.router.initialNavigation();

    this.observeMutations();

    // Start both alternative global event bus listeners.
    this.appInterface.initEvtBusObs();
    this.appInterface.initEvtBusDom();
  }

  ngOnDestroy() {
    this.observeMutations(false);
  }

  /**
   * Observes changes to property inputs from shell to client.
   */
  ngOnChanges(changes: SimpleChanges) {
    this.appInterface.handleInputProperyChanges(changes);
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
  private observeMutations(isObserve = true) {
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
}
