import {
  ClientConfig,
  clientsConfig,
  defineCustomElement,
  ElementName,
  ElementRoute,
  isCustomElementDefined,
  loadClient,
  ShellAction,
  ShellActionsBus,
  ShellActionType,
} from '@microfr/shell';
import { Subscription } from 'rxjs';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  private actionsBus: ShellActionsBus;
  private actionsBusSubs: Subscription;

  connectedCallback() {
    this.initState();
    this.render();
  }

  /**
   * Ensure all observable streams are unsubscribed from.
   */
  disconnectedCallback() {
    this.actionsBusSubs.unsubscribe();
  }

  attributeChangedCallback() {}

  /**
   * Setup Shell actions event bus.
   */
  private initState() {
    this.actionsBus = ShellActionsBus.getInstance();
    this.initActionsListeners();
  }

  private initActionsListeners() {
    this.actionsBusSubs = this.actionsBus.actions$.subscribe((action: ShellAction) => {
      if (action) {
        console.log('Action from shell :', action);
      }
    });
  }

  private render() {
    // Render main template.
    this.innerHTML = getCustomElementTemplate();

    // Create sample shell navbar buttons.
    const navbar: HTMLElement = document.getElementById('app-btns');
    this.initButtons(navbar);

    // Create client app elements.
    const container: HTMLElement = document.getElementById('content');
    this.initClients(container);

    // Call the Angular apps' enableProdMode method once and remove from each main.ts.
    (window as any).ng.core.enableProdMode();
  }

  private initClients(container: HTMLElement) {
    // Load relevant clients into top-level view.
    const elementConfigs: ClientConfig[] = [
      clientsConfig.clientAngularA,
      clientsConfig.clientAngularB,
      clientsConfig.clientReactA,
    ];
    elementConfigs.forEach((config: ClientConfig) => {
      // Load client element from config.
      const element: HTMLElement = loadClient(config, container);

      // Init client once loaded.
      const isClientLoaded: Promise<void> = isCustomElementDefined(config.element);
      isClientLoaded.then(() => {
        this.handleClientLoaded(config);
      });
    });

    // All clients have been loaded.
    const areAllClientsLoaded: Array<Promise<void>> = elementConfigs.map(
      (config: ClientConfig) => isCustomElementDefined(config.element)
    );
    Promise.all(areAllClientsLoaded).then(() => {
      this.handleAllClientsLoaded();
    });
  }

  private handleClientLoaded(config: ClientConfig) {
    config.isLoaded = true;
    this.actionsBus.dispatch({
      type: ShellActionType.ClientIsLoaded,
      payload: config.element,
    });
  }

  private handleAllClientsLoaded() {
    this.actionsBus.dispatch({
      type: ShellActionType.AllClientsAreLoaded,
    });
  }

  private initButtons(navbar: HTMLElement) {
    const buttonConfigs: ClientConfig[] = [
      clientsConfig.clientAngularA,
      clientsConfig.clientAngularB,
      clientsConfig.clientReactA,
    ];
    navbar.innerHTML = getCustomElementNavButtons(buttonConfigs);
    const buttons: HTMLCollectionOf<HTMLButtonElement> = navbar.getElementsByTagName(
      'button'
    );
    Array.from(buttons).forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', this.handleButtonClick.bind(this, button));
    });
  }

  private handleButtonClick(button: HTMLButtonElement) {
    this.goToAppRoute(button.id as ElementRoute);
    this.sendTestAction(button.id);
  }

  private goToAppRoute(route: ElementRoute) {
    document.location.href = `#/${route}`;
  }

  private sendTestAction(test: string) {
    this.actionsBus.dispatch({
      type: ShellActionType.Foo,
      payload: test,
    });
  }
}

defineCustomElement(ElementName.Shell, AppElement);

function getCustomElementTemplate() {
  return `
    <main class="main-panel">
      <h1 class="heading">Microfrontends Root Element</h1>
      <nav class="navbar" id="app-btns"></nav>
      <div id="content" class="content">
        <!-- Web Components go here -->
      </div>
    </main>
  `;
}

function getCustomElementNavButtons(configs: ClientConfig[]): string {
  return configs
    .map(
      (config: ClientConfig) => `
      <button class="btn-generic" type="button" id="${config.route}">
        ${config.label}
      </button>
    `
    )
    .join('');
}
