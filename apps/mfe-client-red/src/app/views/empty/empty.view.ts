import { Component } from '@angular/core';

/**
 * An empty view which serves to 'destroy' the app's views on given routes when used
 * within a micro-frontends architecture.
 */
@Component({
  template: '',
})
export class EmptyView {
  constructor() {
    console.log('EmptyComponent: mfe-client-red');
  }
}
