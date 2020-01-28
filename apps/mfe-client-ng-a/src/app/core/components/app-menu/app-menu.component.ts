import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromSharedUi from '@microfr/shared/ui';
import * as fromSharedUtils from '@microfr/shared/util';

import { rootRouteConfig } from '../../../shared/constants';
import { RouteItem } from '../../../shared/models';

@Component({
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  routes: RouteItem[];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
    this.routes = [rootRouteConfig.featureA, rootRouteConfig.featureB];
  }

  ngOnInit() {
    const uiFoo: string = fromSharedUi.getFoo();
    const utilsFoo: string = fromSharedUtils.getFoo();
    console.log('Client A :', uiFoo);
    console.log('Client A :', utilsFoo);
  }

  onItemClick(item: RouteItem) {
    this.router.navigate([item.name], { relativeTo: this.route });
  }
}
