import { ClientConfig, clientsConfig, ElementName, loadClient } from '@microfr/shell';

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
  }
}

if (!customElements.get(ElementName.Shell)) {
  customElements.define(ElementName.Shell, AppElement);
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
