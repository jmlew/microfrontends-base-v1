import './app.element.scss';

import * as fromSharedUi from '@microfr/shared/ui';
import * as fromSharedUtils from '@microfr/shared/utils';

enum ElementName {
  Shell = 'mfe-shell',
  ClientA = 'mfe-client-a',
  ClientB = 'mfe-client-b',
}

interface ClientConfig {
  isLoaded: boolean;
  scripts: string[];
  element: string;
}

const clientsConfig: { [name: string]: ClientConfig } = {
  [ElementName.ClientA]: {
    isLoaded: false,
    scripts: [
      'mfe-client-a/main.js',
      'mfe-client-a/polyfills.js',
      // Below scripts are combined into main.js when using ngx-build-plus
      // 'mfe-client-a/runtime.js',
    ],
    element: ElementName.ClientA,
  },
  [ElementName.ClientB]: {
    isLoaded: false,
    scripts: [
      'mfe-client-b/main.es5.js',
      'mfe-client-b/polyfills.es5.js',
      'mfe-client-b/runtime.js',
    ],
    element: ElementName.ClientB,
  },
};

function loadClient(name: string) {
  const config: ClientConfig = clientsConfig[name];
  if (config.isLoaded) return;

  const content: HTMLElement = document.getElementById('content');

  config.scripts.forEach((path: string) => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = path;
    script.onerror = () => console.error(`error loading ${path}`);
    content.appendChild(script);
  });

  const element: HTMLElement = document.createElement(config.element);
  content.appendChild(element);

  element.addEventListener('message', (msg) => this.handleMessage(msg));
  // element.setAttribute('state', 'init');
}

function getCustomElementTemplate() {
  return `
    <main class="main-panel">
      <h1 class="heading">Microfrontends Root Element</h1>
      <div id="content" class="content">
        <!-- Web Components go here -->
      </div>
    </main>
  `;
}

function defineCustomElement(name: ElementName, element: Function) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
  }
}

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = getCustomElementTemplate();

    const uiFoo: string = fromSharedUi.getFoo();
    const utilsFoo: string = fromSharedUtils.getFoo();
    console.log('Shell :', uiFoo);
    console.log('Shell :', utilsFoo);

    // Load all clients defined in config.
    const clientNames: string[] = [ElementName.ClientA];
    clientNames.forEach(loadClient);
  }
}

defineCustomElement(ElementName.Shell, AppElement);
