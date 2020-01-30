import {
  ClientConfig,
  clientsConfig,
  ElementName,
  loadClient,
  defineCustomElement,
} from '@microfr/shell';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = getCustomElementTemplate();
    const container: HTMLElement = document.getElementById('content');

    // Load relevant clients into top-level view.
    const clientConfigs: ClientConfig[] = [
      clientsConfig.clientAngularA,
      clientsConfig.clientAngularB,
    ];
    clientConfigs.forEach((config: ClientConfig) => loadClient(config, container));

    // Call the Angular apps' enableProdMode method once and remove from each main.ts.
    (<any>window).ng.core.enableProdMode();
  }
}

function getCustomElementTemplate() {
  return `
    <main class="main-panel">
      <h1 class="heading">Microfrontends Root Element</h1>
      <nav class="navbar">
        <button
          class="btn-generic"
          onclick="location.href='#/ng-a'"
          type="button">
          Angular App A
        </button>
        <button
          class="btn-generic"
          onclick="location.href='#/ng-b'"
          type="button">
          Angular App B
        </button>
        <button
          class="btn-generic"
          onclick="location.href='#/react-a'"
          type="button">
          React App A
        </button>
      </nav>
      <div id="content" class="content">
        <!-- Web Components go here -->
      </div>
    </main>
  `;
}

defineCustomElement(ElementName.Shell, AppElement);
