import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // selector: 'mfe-client-a', // Element name defined as custom element on ngDoBootstrap.
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppRootComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    // Bootstrapping components as Web Components requires manual router initializion.
    this.router.initialNavigation();
  }
}
