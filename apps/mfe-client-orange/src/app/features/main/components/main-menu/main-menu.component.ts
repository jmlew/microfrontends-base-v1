import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import * as fromConstants from '../../constants';
import {
  CommFromAppsComponent,
  CommToAppsComponent,
  CommTypeComponent,
} from '../../containers';
import { MenuName } from '../../enums/menu.enum';
import { MenuItem } from '../../models/menu.model';

type contentTemplate = CommTypeComponent | CommFromAppsComponent | CommToAppsComponent;

@Component({
  selector: 'app-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, AfterViewInit {
  menuItems: MenuItem[];

  @ViewChild('commType', { static: false })
  commType: TemplateRef<CommTypeComponent>;
  @ViewChild('commFrom', { static: false })
  commFrom: TemplateRef<CommFromAppsComponent>;
  @ViewChild('commTo', { static: false })
  commTo: TemplateRef<CommToAppsComponent>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const contentTemplateMap: {
      [name: string]: TemplateRef<contentTemplate>;
    } = {
      [MenuName.CommunicationType]: this.commType,
      [MenuName.CommunicationFrom]: this.commFrom,
      [MenuName.CommunicationTo]: this.commTo,
    };

    this.menuItems = fromConstants.menuItems.map((item: MenuItem) => ({
      ...item,
      content: contentTemplateMap[item.name],
    }));
    console.log('this.menuItems :', this.menuItems);
  }
}
