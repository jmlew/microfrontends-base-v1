import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CommFromAppsComponent,
  CommToAppsComponent,
  CommTypeComponent,
} from '../../containers';
import { MenuName } from '../../enums/menu.enum';
import { MenuItem } from '../../models/menu.model';
import { AppMenuStateService } from '../../services';

type contentTemplate = CommTypeComponent | CommFromAppsComponent | CommToAppsComponent;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements AfterViewInit {
  menuItems: MenuItem[];
  currentIndex$: Observable<number>;

  @ViewChild('commType', { static: false })
  commType: TemplateRef<CommTypeComponent>;
  @ViewChild('commFrom', { static: false })
  commFrom: TemplateRef<CommFromAppsComponent>;
  @ViewChild('commTo', { static: false })
  commTo: TemplateRef<CommToAppsComponent>;

  constructor(private readonly menuState: AppMenuStateService) {}

  ngAfterViewInit() {
    this.currentIndex$ = this.menuState.menuIndex$;

    const contentTemplateMap: {
      [name: string]: TemplateRef<contentTemplate>;
    } = {
      [MenuName.CommunicationType]: this.commType,
      [MenuName.CommunicationFrom]: this.commFrom,
      [MenuName.CommunicationTo]: this.commTo,
    };

    this.menuItems = this.menuState.menuItems.map((item: MenuItem) => ({
      ...item,
      content: contentTemplateMap[item.name],
    }));
  }

  onGoToMenuItem(name: MenuName) {
    this.menuState.setMenuByName(name);
  }

  onSelectedIndexChanged(index: number) {
    this.menuState.setMenuByIndex(index);
  }
}
