import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { ClientAppDetails, ClientAppElement } from '@microfr/shared/model/app-interface';
import {
  defineCustomElement,
  isAppShown,
  isMutationAttributeHidden,
} from '@microfr/shell';
import { appConfig } from './app/core/constants';
import { appVisibility } from './app/core/helpers';
import AppRoot from './app/root/AppRoot';

class AppElement extends HTMLElement implements ClientAppElement {
  private observer: MutationObserver;
  private _appDetails: ClientAppDetails;

  constructor() {
    super();
    this.initMutationObserver();
  }

  connectedCallback() {
    this.observeMutations();
    this.mountElement();
  }

  disconnectedCallback() {
    this.observeMutations(false);
    this.unmountElement();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) {
      return;
    }

    console.log('attributeChangedCallback :', name, oldValue, newValue);
  }

  /**
   * Example property input from shell to client.
   */
  set appDetails(data: ClientAppDetails) {
    console.log(`set appDetails on ${appConfig.label}:`, data);
    this._appDetails = data;

    // TODO: ensure approot props are updated with main property changes.
    if (!appVisibility.isHidden) {
      this.mountElement();
    }
  }

  /**
   * Example property accessor to shell from client.
   */
  get appDetails(): ClientAppDetails {
    return this._appDetails;
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
      ? this.observer.observe(this, { attributes: true, attributeOldValue: true })
      : this.observer.disconnect();
  }

  /**
   * Observes DOM mutations on the native element and sets the apps state accoring to the
   * element's visible status.
   */
  private handleMutationChanges(mutations: MutationRecord[]) {
    const isHiddenChanged: boolean = mutations.some(isMutationAttributeHidden);
    if (isHiddenChanged) {
      const isShown: boolean = isAppShown(this);
      appVisibility.isHidden = !isShown;
      console.log(`isShown ${appConfig.label}: `, isShown);
      if (isShown) {
        this.mountElement();
      } else {
        this.unmountElement();
      }
    }
  }

  private mountElement() {
    render(<AppRoot appDetails={this.appDetails} />, this);
  }

  private unmountElement() {
    unmountComponentAtNode(this);
  }
}

defineCustomElement(appConfig.name, AppElement);
