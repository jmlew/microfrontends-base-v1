import { ClientAppElement } from './../../../../shared/model/src/lib/app-interface.model';
import { ElementName } from './element.enum';
import { ClientConfig } from './element.model';

export function loadClient(
  config: ClientConfig,
  container: HTMLElement
): ClientAppElement {
  if (config.isLoaded) {
    return;
  }

  config.scripts.forEach((path: string) => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = path;
    script.onerror = () => console.error(`error loading ${path}`);
    container.appendChild(script);
  });

  return embedElement(config.element, container) as ClientAppElement;
}

export function embedElement(name: ElementName, container: HTMLElement): HTMLElement {
  const element: HTMLElement = document.createElement(name);
  container.appendChild(element);
  return element;
}

// tslint:disable-next-line: ban-types
export function defineCustomElement(name: ElementName | string, element: Function) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
  }
}

export function isCustomElementDefined(name: ElementName): Promise<void> {
  return customElements.whenDefined(name);
}
