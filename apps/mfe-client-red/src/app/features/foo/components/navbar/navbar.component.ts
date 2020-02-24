import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteItem } from '../../../../shared/models';

@Component({
  selector: 'app-foo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() routes: RouteItem[];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  ngOnInit() {}

  onItemClick(item: RouteItem) {
    this.router.navigate([item.name], { relativeTo: this.route });
  }
}
