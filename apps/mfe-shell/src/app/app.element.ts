import './app.element.scss';

import * as fromSharedUi from '@microfr/shared/ui';
import * as fromSharedUtils from '@microfr/shared/utils';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const uiFoo: string = fromSharedUi.getFoo();
    const utilsFoo: string = fromSharedUtils.getFoo();
    console.log('uiFoo :', uiFoo);
    console.log('utilsFoo :', utilsFoo);
    this.innerHTML = `
      <main>
        <h1 class="sample-style">Microfrontends Root Element</h1>
      </main>
    `;
  }
}
customElements.define('microfr-root', AppElement);
