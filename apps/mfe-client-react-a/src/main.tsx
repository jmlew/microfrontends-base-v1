import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { defineCustomElement } from '@microfr/shell';
import { AppRoot } from './app/core/components';
import { appConfig } from './app/shared/constants';

class AppElement extends HTMLElement {
  private observer: MutationObserver;

  constructor() {
    super();
    this.initObserver();
  }

  connectedCallback() {
    this.mountElement();
  }

  disconnectedCallback() {
    this.unmountElement();
  }

  private initObserver() {
    this.observer = new MutationObserver(this.updateElement.bind(this));
    this.observer.observe(this, { attributes: true });
  }

  private updateElement() {
    this.unmountElement();
    this.mountElement();
  }

  private mountElement() {
    render(<AppRoot />, this);
  }

  private unmountElement() {
    unmountComponentAtNode(this);
  }
}

defineCustomElement(appConfig.element, AppElement);
