import { ShellAppElement } from './app.element';

describe('ShellAppElement', () => {
  let app: ShellAppElement;

  beforeEach(() => {
    app = new ShellAppElement();
  });

  it('should create successfully', () => {
    expect(app).toBeTruthy();
  });

  it('should have a greeting', () => {
    app.connectedCallback();

    expect(app.querySelector('h1').innerHTML).toEqual('Welcome to mfe!');
  });
});
