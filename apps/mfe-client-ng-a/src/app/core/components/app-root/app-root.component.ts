import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppInfo } from '@microfr/shared/model';

@Component({
  // selector: 'mfe-client-ng-a', // Element name defined as custom element on ngDoBootstrap.
  template: `
    <div class="mat-typography">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppRootComponent implements OnInit, OnChanges {
  @Input() appInfo: ClientAppInfo;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    console.log('AppRootComponent :', this);

    // Bootstrapping components as Web Components requires manual router initializion.
    this.router.initialNavigation();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes on mfe-client-ng-a: ', changes);
  }
}
