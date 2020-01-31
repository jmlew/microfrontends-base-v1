import { ClientConfig } from './element.model';
import { ElementName } from './element.enum';

export function loadClient(config: ClientConfig, container: HTMLElement): HTMLElement {
  if (config.isLoaded) {
    return;
  }
  console.log('loadClient :', config);

  config.scripts.forEach((path: string) => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = path;
    script.onerror = () => console.error(`error loading ${path}`);
    container.appendChild(script);
  });

  return embedElement(config.element, container);
}

export function embedElement(name: ElementName, container: HTMLElement): HTMLElement {
  const element: HTMLElement = document.createElement(name);
  container.appendChild(element);
  return element;
}

export function defineCustomElement(name: ElementName, element: Function) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
  }
}

export function isCustomElementDefined(name: ElementName): Promise<void> {
  return customElements.whenDefined(name);
}
