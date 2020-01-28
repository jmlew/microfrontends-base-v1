import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    console.log('Client TMP app menu loaded');
  }

  onItemClick(item: RouteItem) {
    this.router.navigate([item.name], { relativeTo: this.route });
  }
}
