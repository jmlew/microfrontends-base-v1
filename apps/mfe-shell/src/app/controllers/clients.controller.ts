import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ClientApp,
  ClientAppDetails,
  ClientAppElement,
} from '@microfr/shared/model/app-interface';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import {
  ClientConfig,
  ElementName,
  ElementRoute,
  embedElement,
  getAppByElementName,
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

  /**
   * Showcase listening to Evt Bus DOM Custom Events.
   */
  private listenToEvtBusDom() {
    evtBusDom.addEventItem(
      {
        type: EvtBusEventType.ChangeRoute,
        listener: (event: CustomEvent) => {
          console.log(
            'Event received by Shell:',
            EvtBusEventType.ChangeRoute,
            event.detail
          );
          this.handleRouteChange(event.detail as ElementRoute);
        },
      },
      this.evtBusDomItems
    );
  }

  /**
   * Showcase listening to Evt Bus Observables.
   */
  private listenToEvtBusObs() {
    evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action) {
          switch (action.type) {
            case EvtBusActionType.ChangeRoute:
              console.log('Action received by Shell:', action);
              this.handleRouteChange(action.payload as ElementRoute);
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
      element.className = 'client-app-root';

      // Init client once loaded.
      const isClientLoaded: Promise<void> = isCustomElementDefined(name);
      isClientLoaded.then(() => {
        // Add app element to local collection.
        this.clients.push({ name, element });
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
    this.updateClientInputs();
  }

  /**
   * Sample functionality showing the updating of each app with info initialised by the
   * shell.
   */
  private updateClientInputs() {
    const appDetailsMap: { [element: string]: ClientAppDetails } = {
      [ElementName.ClientRed]: {
        toApp: ClientApp.Red,
        fromApp: ClientApp.Any,
        name: 'Angular Sample A',
        description: 'Example Angular Client',
      },
      [ElementName.ClientBlue]: {
        toApp: ClientApp.Blue,
        fromApp: ClientApp.Any,
        name: 'React Sample App A',
        description: 'Example React Client',
      },
      [ElementName.ClientOrange]: {
        toApp: ClientApp.Orange,
        fromApp: ClientApp.Any,
        name: 'Angular Sample B',
        description: 'Example Angular Client',
      },
    };

    Object.keys(appDetailsMap).forEach((name: ElementName) => {
      const app: ClientAppElement = getAppByElementName(name);
      app.appDetails = appDetailsMap[name];
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
