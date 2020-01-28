import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // selector: 'mfe-client-ng-b', // Element name defined as custom element on ngDoBootstrap.
  template: `
    <div class="mat-typography">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppRootComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    // Bootstrapping components as Web Components requires manual router initializion.
    this.router.initialNavigation();
  }
}
