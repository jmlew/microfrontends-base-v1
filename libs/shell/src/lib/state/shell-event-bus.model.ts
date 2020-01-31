export interface ShellAction {
  type: ShellActionType;
  payload?: any;
}

export enum ShellActionType {
  ClientIsLoaded = '[Shell] Client is Loaded',
  AllClientsAreLoaded = '[Shell] All Clients are Loaded',
  Foo = '[Shell] Foo',
  Bar = '[Shell] Bar',
}
