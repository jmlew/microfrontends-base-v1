import { ClientConfig, clientsConfig, ElementName, loadClient } from '@microfr/shell';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = getCustomElementTemplate();
    const container: HTMLElement = document.getElementById('content');

    // Load relevant clients into top-level view.
    const clientConfigs: ClientConfig[] = [clientsConfig.clientA];
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
      <p class="shell-global-style-example">A sample app</p>
      <div id="content" class="content">
        <!-- Web Components go here -->
      </div>
    </main>
  `;
}
