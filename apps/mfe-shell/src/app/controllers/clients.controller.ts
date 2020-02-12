import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientAppElement, ClientAppInfo } from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import {
  ClientConfig,
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

export class MfeClientsController {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];
  private clients: Array<{ name: ElementName; element: ClientAppElement }>;
  private clientConfigs: ClientConfig[];

  constructor(clientConfigs: ClientConfig[]) {
    this.clientConfigs = clientConfigs;
    this.clients = [];
    this.listenToEvtBusObs();
    this.listenToEvtBusDom();
  }

  /**
   * Ensure all observable streams are unsubscribed from. This isn't strictly necessary,
   * since the shell element should remain in DOM.
   */
  destroy() {
    evtBusObs.destroy(this.evtBusObsDestroy);
    evtBusDom.destroy(this.evtBusDomItems);
  }

  private listenToEvtBusDom() {
    evtBusDom.addEventItem(
      {
        type: EvtBusEventType.ChangeRoute,
        listener: (event: CustomEvent) => {
          console.log('Event to Shell:', EvtBusEventType.ChangeRoute, event.detail);
          this.handleRouteChange(event.detail as ElementRoute);
        },
      },
      this.evtBusDomItems
    );
    evtBusDom.addEventItem(
      {
        type: EvtBusEventType.SelectClient,
        listener: (event: CustomEvent) => {
          // Handle event.
          console.log('Event to Shell:', EvtBusEventType.SelectClient, event.detail);
        },
      },
      this.evtBusDomItems
    );
  }

  private listenToEvtBusObs() {
    evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action) {
          switch (action.type) {
            case EvtBusActionType.ChangeRoute:
              console.log('Action to Shell:', action);
              this.handleRouteChange(action.payload as ElementRoute);
              break;
            case EvtBusActionType.SelectClient:
              // Handle event.
              console.log('Action to Shell:', action);
              break;

            default:
              break;
          }
        }
      });
  }

  initClients() {
    // Load relevant clients into top-level view.
    this.clientConfigs.forEach((config: ClientConfig, index: number) => {
      const { name } = config;

      // Load client element from config.
      const container: HTMLElement = document.getElementById(name);
      loadClient(config, container);

      // Create element and append to container.
      const element: ClientAppElement = embedElement(config.name, container);

      // Init client once loaded.
      const isClientLoaded: Promise<void> = isCustomElementDefined(name);
      isClientLoaded.then(() => {
        // Add app element to local collection.
        this.clients.push({ name, element });

        // Hide all but the first client app.
        if (index > 0) {
          // hideApp(element);
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

  /**
   * Sample functionality showing the updating of each app with info initialised by the
   * shell.
   */
  private updateClientInputs() {
    const appInfoMap: { [element: string]: ClientAppInfo } = {
      [ElementName.ClientRed]: {
        name: 'Client Angular A',
        description: 'Example Angular Client',
      },
      [ElementName.ClientBlue]: {
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

  private goToRoute(route: ElementRoute) {
    document.location.href = `#/${route}`;
  }

  private handleRouteChange(route: ElementRoute) {
    this.goToRoute(route);
    // this.updateClientVisibilityOnRouteChange(route);
  }

  private updateClientVisibilityOnRouteChange(route: ElementRoute) {
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
}
