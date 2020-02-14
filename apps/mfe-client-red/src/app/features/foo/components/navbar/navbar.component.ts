import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appRouteConfig } from './../../../../root/app-route-config.constant';

import { RouteItem } from '../../../../shared/models';

@Component({
  selector: 'app-foo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  routes: RouteItem[];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
    this.routes = [appRouteConfig.featureFooA, appRouteConfig.featureFooB];
  }

  ngOnInit() {}

  onItemClick(item: RouteItem) {
    this.router.navigate([item.name], { relativeTo: this.route });
  }
}
