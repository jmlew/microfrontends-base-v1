import { ClientAppElement } from '@microfr/shared/model/app-interface';
import { ElementName } from './element.enum';
import { ClientConfig } from './element.model';

export function loadClient(config: ClientConfig, container: HTMLElement) {
  if (config.isLoaded) {
    return;
  }

  config.scripts.forEach((path: string) => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = path;
    script.onerror = () => console.error(`error loading ${path}`);
    container.appendChild(script);
  });
}

export function embedElement(
  name: ElementName,
  container: HTMLElement
): ClientAppElement {
  const element: HTMLElement = document.createElement(name);
  container.appendChild(element);
  return element as ClientAppElement;
}

// tslint:disable-next-line: ban-types
export function defineCustomElement(
  name: ElementName | string,
  // tslint:disable-next-line: ban-types
  elementConstructor: Function
) {
  if (!customElements.get(name)) {
    customElements.define(name, elementConstructor);
  }
}

export function isCustomElementDefined(name: ElementName): Promise<void> {
  return customElements.whenDefined(name);
}

export function getApp(name: ElementName): ClientAppElement {
  return document.querySelector(name);
}

export function showApp(element: ClientAppElement) {
  element.hidden = false;
}

export function hideApp(element: ClientAppElement) {
  element.hidden = true;
}

export function isAppShown(element: ClientAppElement): boolean {
  return !element.hidden;
}

export function isAppHidden(element: ClientAppElement): boolean {
  return element.hidden;
}

export function isMutationAttributeHidden(mutation: MutationRecord): boolean {
  return mutation.attributeName === 'hidden';
}

export function addApp(element: ClientAppElement, container: HTMLElement) {
  if (!container.contains(element)) {
    container.appendChild(element);
  }
}

export function removeApp(element: ClientAppElement, container: HTMLElement) {
  if (container.contains(element)) {
    container.removeChild(element);
  }
}
