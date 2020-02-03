import { Component } from '@angular/core';

import { LazyLoaderService } from '@microfr/shared/ui-angular';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private readonly lazyLoader: LazyLoaderService) {}

  onLoadModule() {
    // TODO: ensure lazy-loading code-splitting doesn't disable the initial load of the
    // entire module.
    const moduleLoad = () =>
      import('../../../feature-a/feature-a.module').then((m) => m.FeatureAModule);
    this.lazyLoader.loadModule(moduleLoad);
  }
}
