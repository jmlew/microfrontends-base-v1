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

  const element: HTMLElement = embedElement(config.element, container);

  element.addEventListener('message', (msg) => this.handleMessage(msg));
  element.setAttribute('state', 'init');
}

export function embedElement(name: string, container: HTMLElement): HTMLElement {
  const element: HTMLElement = document.createElement(name);
  container.appendChild(element);
  return element;
}
