import { Subject } from 'rxjs';

import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { ClientConfig, ElementRoute } from '@microfr/shell';
import { NavButton } from '../components';
import { evtBusDom, evtBusObs } from '../helpers';

export class MfeNavbarController {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];
  private clientConfigs: ClientConfig[];

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
    const buttons: HTMLCollectionOf<HTMLButtonElement> = navbar.getElementsByTagName(
      'button'
    );
    Array.from(buttons).forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', this.handleButtonClick.bind(this, button));
    });
  }

  private handleButtonClick(button: HTMLButtonElement) {
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
    const appButtons: string[] = configs.map((config: ClientConfig) => NavButton(config));
    return appButtons.join('');
  }
}
