import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { ClientAppElement, ClientAppInfo } from '@microfr/shared/model/app-interface';
import {
  defineCustomElement,
  isAppShown,
  isMutationAttributeHidden,
} from '@microfr/shell';
import { AppRoot } from './app/core/components';
import { appConfig } from './app/shared/constants';
import { appVisibility } from './app/shared/helpers';

class AppElement extends HTMLElement implements ClientAppElement {
  private observer: MutationObserver;
  private _appInfo: ClientAppInfo;

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
  set appInfo(data: ClientAppInfo) {
    console.log(`set appInfo on ${appConfig.label}:`, data);
    this._appInfo = data;
  }

  /**
   * Example property accessor to shell from client.
   */
  get appInfo(): ClientAppInfo {
    return this._appInfo;
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
      this.unmountElement();
      if (isShown) {
        this.mountElement();
      }
    }
  }

  private mountElement() {
    render(<AppRoot />, this);
  }

  private unmountElement() {
    unmountComponentAtNode(this);
  }
}

defineCustomElement(appConfig.name, AppElement);
