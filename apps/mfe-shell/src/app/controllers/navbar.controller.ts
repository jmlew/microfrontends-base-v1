import { Subject } from 'rxjs';

import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { ClientConfig, ElementName, ElementRoute } from '@microfr/shell';
import { NavButton } from '../components';
import { evtBusDom, evtBusObs } from '../helpers';

export class MfeNavbarController {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];
  private clientConfigs: ClientConfig[];
  private buttons: HTMLCollectionOf<HTMLButtonElement>;

  constructor(clientConfigs: ClientConfig[]) {
    this.clientConfigs = clientConfigs;
  }

  /**
   * Ensure all observable streams are unsubscribed from. This isn't strictly necessary,
   * since the shell element should remain in DOM.
   */
  destroy() {
    evtBusObs.destroy(this.evtBusObsDestroy);
    evtBusDom.destroy(this.evtBusDomItems);
  }

  initButtons() {
    const navbar: HTMLElement = document.getElementById('shell-menu');
    navbar.innerHTML = this.getCustomElementNavButtons(this.clientConfigs);
    this.buttons = navbar.getElementsByTagName('button');
    Array.from(this.buttons).forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', this.handleButtonClick.bind(this, button));
    });
  }

  private handleButtonClick(button: HTMLButtonElement) {
    // Update button styles.
    const activeClassName = 'is-active';
    button.classList.add(activeClassName);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.buttons.length; i++) {
      const item: HTMLButtonElement = this.buttons.item(i);
      if (item !== button && item.classList.contains(activeClassName)) {
        item.classList.remove(activeClassName);
      }
    }

    // Send route change event.
    const route: ElementRoute = button.id as ElementRoute;
    this.sendButtonEvent(route);
  }

  private sendButtonEvent(route: ElementRoute) {
    evtBusObs.dispatch({
      type: EvtBusActionType.ChangeRoute,
      payload: route,
    });
    evtBusDom.dispatch(EvtBusEventType.ChangeRoute, route);
  }

  private getCustomElementNavButtons(configs: ClientConfig[]): string {
    const appButtons: string[] = configs
      .filter((config: ClientConfig) => config.name !== ElementName.ClientOrange)
      .map((config: ClientConfig) => NavButton(config));
    return appButtons.join('');
  }
}
