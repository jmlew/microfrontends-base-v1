import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientAppElement, ClientAppInfo } from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import {
  ClientConfig,
  clientsConfig,
  defineCustomElement,
  ElementName,
  ElementRoute,
  embedElement,
  getApp,
  hideApp,
  isCustomElementDefined,
  loadClient,
  showApp,
} from '@microfr/shell';

import { evtBusDom, evtBusObs } from '../helpers';

export class ShellAppElement extends HTMLElement {
  public static observedAttributes = [];
  private clientConfigs: ClientConfig[];
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];
  private clients: Array<{ name: ElementName; element: ClientAppElement }>;
  private container: HTMLElement;
  private navbar: HTMLElement;

  constructor() {
    super();

    this.clientConfigs = [clientsConfig.clientAngularA, clientsConfig.clientReactA];
    this.clients = [];
  }

  connectedCallback() {
    this.listenToEvtBusObs();
    this.listenToEvtBusDom();
    this.render();
  }

  /**
   * Ensure all observable streams are unsubscribed from. This isn't strictly necessary,
   * since the shell element should remain in DOM.
   */
  disconnectedCallback() {
    evtBusObs.destroy(this.evtBusObsDestroy);
    evtBusDom.destroy(this.evtBusDomItems);
  }

  private listenToEvtBusDom() {
    evtBusDom.addEventItem(
      {
        type: EvtBusEventType.SampleEvent,
        listener: (event: CustomEvent) => {
          console.log('Event to Shell:', event.detail);
        },
      },
      this.evtBusDomItems
    );
  }

  private listenToEvtBusObs() {
    evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action && action.type === EvtBusActionType.SampleEvent) {
          console.log('Action to Shell:', action);
        }
      });
  }

  private render() {
    // Render main template.
    this.innerHTML = getCustomElementTemplate();

    // Create sample shell navbar buttons.
    this.navbar = document.getElementById('app-btns');
    this.initButtons(this.navbar);

    // Create client app elements.
    this.container = document.getElementById('content');
    this.initClients(this.container);

    // Call the Angular apps' enableProdMode method once and remove from each main.ts.
    (window as any).ng.core.enableProdMode();
  }

  private initClients(container: HTMLElement) {
    // Load relevant clients into top-level view.
    this.clientConfigs.forEach((config: ClientConfig, index: number) => {
      const { name } = config;

      // Load client element from config.
      loadClient(config, container);

      // Create element and appendto container.
      const element: ClientAppElement = embedElement(config.name, container);

      // Add app element to local collection.
      this.clients.push({ name, element });

      // Init client once loaded.
      const isClientLoaded: Promise<void> = isCustomElementDefined(name);
      isClientLoaded.then(() => {
        // Hide all but the first client app.
        if (index > 0) {
          hideApp(element);
        }
        this.handleClientLoaded(config);
      });
    });

    // All clients have been loaded.
    const areAllClientsLoaded: Array<Promise<void>> = this.clientConfigs.map(
      (config: ClientConfig) => isCustomElementDefined(config.name)
    );
    Promise.all(areAllClientsLoaded).then(() => {
      this.handleAllClientsLoaded();
    });
  }

  /**
   * Sample functionality showing the updating of each app with info initialised by the
   * shell.
   */
  private updateClientInputs() {
    const appInfoMap: { [element: string]: ClientAppInfo } = {
      [ElementName.ClientAngularA]: {
        name: 'Client Angular A',
        description: 'Example Angular Client',
      },
      [ElementName.ClientReactA]: {
        name: 'Client React A',
        description: 'Example React Client',
      },
    };

    Object.keys(appInfoMap).forEach((name: ElementName) => {
      const app: ClientAppElement = getApp(name);
      const info: ClientAppInfo = appInfoMap[name];
      app.appInfo = info;
      console.log('appInfo set on client:', name, app.appInfo);
    });
  }

  private handleClientLoaded(config: ClientConfig) {
    config.isLoaded = true;
    evtBusObs.dispatch({
      type: EvtBusActionType.ClientIsLoaded,
      payload: config.name,
    });
  }

  private handleAllClientsLoaded() {
    evtBusObs.dispatch({
      type: EvtBusActionType.AllClientsAreLoaded,
    });

    // Example interaction between shell and apps through a shared interface.
    this.updateClientInputs();
  }

  private initButtons(navbar: HTMLElement) {
    navbar.innerHTML = getCustomElementNavButtons(this.clientConfigs);
    const buttons: HTMLCollectionOf<HTMLButtonElement> = navbar.getElementsByTagName(
      'button'
    );
    Array.from(buttons).forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', this.handleButtonClick.bind(this, button));
    });
  }

  private handleButtonClick(button: HTMLButtonElement) {
    const route: ElementRoute = button.id as ElementRoute;
    this.sendTestAction(route);
    this.goToAppRoute(route);
    this.updateRenderedAppsOnRouteChange(route);
  }

  private updateRenderedAppsOnRouteChange(route: ElementRoute) {
    const currentConfig: ClientConfig = this.clientConfigs.find(
      (item: ClientConfig) => item.route === route
    );
    // Show the client which matches the route while hiding the others if the route
    // correspnds to a client, otherwise show all clients.

    // TODO: add multiple routes per client config and only hide apps which don't match
    // any of the route path.
    if (currentConfig) {
      this.clients.forEach((item: { name: ElementName; element: ClientAppElement }) => {
        const { name, element } = item;
        name === currentConfig.name ? showApp(element) : hideApp(element);
      });
    } else {
      this.clients.forEach((item: { name: ElementName; element: ClientAppElement }) =>
        showApp(item.element)
      );
    }
  }

  private goToAppRoute(route: ElementRoute) {
    document.location.href = `#/${route}`;
  }

  private sendTestAction(route: ElementRoute) {
    const sampleEventData = { payload: `Fired from Shell, go to route: ${route}` };
    evtBusObs.dispatch({
      type: EvtBusActionType.SampleEvent,
      payload: sampleEventData,
    });
    evtBusDom.dispatch(EvtBusEventType.SampleEvent, sampleEventData);
  }
}

defineCustomElement(ElementName.Shell, ShellAppElement);

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
  const appButtons: string[] = configs.map((config: ClientConfig) => NavButton(config));
  const allButton: string = NavButton({ route: '', label: 'Home' });
  return [...appButtons, allButton].join('');
}

function NavButton({ route, label }) {
  return `
    <button class="btn-generic" type="button" id="${route}">
      ${label}
    </button>
  `;
}
