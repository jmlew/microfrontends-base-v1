import './app.element.scss';

import * as fromSharedUi from '@microfr/shared/ui';
import * as fromSharedUtils from '@microfr/shared/utils';

interface ClientConfig {
  isLoaded: boolean;
  path: string;
  element: string;
}

const clientsConfig: { [name: string]: ClientConfig } = {
  'mfe-client-a': {
    isLoaded: false,
    path: 'mfe-client-a/main-es5.js',
    element: 'mfe-client-a'
  },
  'mfe-client-b': {
    isLoaded: false,
    path: 'mfe-client-b/main.es5.js',
    element: 'mfe-client-b'
  }
};

function loadClient(name: string) {
  const config: ClientConfig = clientsConfig[name];
  if (config.isLoaded) return;

  const content: HTMLElement = document.getElementById('content');

  const script: HTMLScriptElement = document.createElement('script');
  script.src = config.path;
  content.appendChild(script);

  const element: HTMLElement = document.createElement(config.element);
  content.appendChild(element);

  element.addEventListener('message', msg => this.handleMessage(msg));
  // element.setAttribute('state', 'init');

  script.onerror = () => console.error(`error loading ${config.path}`);
}

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const uiFoo: string = fromSharedUi.getFoo();
    const utilsFoo: string = fromSharedUtils.getFoo();
    console.log('uiFoo :', uiFoo);
    console.log('utilsFoo :', utilsFoo);
    this.innerHTML = `
      <main class="main-panel>
        <h1 class="heading">Microfrontends Root Element</h1>
        <div id="content" class="content">
          <!-- Web Components go here -->
        </div>
      </main>
    `;

    // Load all clients defined in config.
    const clientNames: string[] = Object.keys(clientsConfig);
    clientNames.forEach(loadClient);
  }
}
customElements.define('microfr-root', AppElement);
