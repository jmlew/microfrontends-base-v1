import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <main>
        <h1 class="sample-style">Microfrontends Root Element</h1>
      </main>
    `;
  }
}
customElements.define('microfr-root', AppElement);
