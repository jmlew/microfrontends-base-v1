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

  const element: HTMLElement = document.createElement(config.element);
  container.appendChild(element);

  element.addEventListener('message', (msg) => this.handleMessage(msg));
  element.setAttribute('state', 'init');
}
