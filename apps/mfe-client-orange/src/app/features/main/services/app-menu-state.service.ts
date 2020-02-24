import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { destroy } from '@microfr/shared/util/common';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import * as fromConstants from '../constants';
import { MenuName } from '../enums/menu.enum';
import { MenuItem } from '../models/menu.model';

@Injectable()
export class AppMenuStateService implements OnDestroy {
  private unsubscribe: Subject<unknown> = new Subject();

  private menuIndex: BehaviorSubject<number> = new BehaviorSubject(null);

  menuItems: MenuItem[] = fromConstants.menuItems;

  constructor() {
    this.setMenuByName(MenuName.CommunicationTo);
  }

  ngOnDestroy() {
    destroy(this.unsubscribe);
  }

  get menuIndex$(): Observable<number> {
    return this.menuIndex.asObservable().pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged()
    );
  }

  get menuIndexValue(): number {
    return this.menuIndex.getValue();
  }

  get menuName$(): Observable<MenuName> {
    return this.menuIndex$.pipe(map(this.getMenuNameByIndex));
  }

  setMenuByIndex(index: number) {
    this.menuIndex.next(index);
  }

  setMenuByName(name: MenuName) {
    const index: number = this.getMenuIndexByName(name);
    this.setMenuByIndex(index);
  }

  private getMenuItemByIndex(index: number): MenuItem {
    return this.menuItems[index];
  }

  private getMenuNameByIndex(index: number): MenuName {
    const item: MenuItem = this.getMenuItemByIndex(index);
    return item.name;
  }

  private getMenuIndexByName(name: MenuName): number {
    return this.menuItems.findIndex((item: MenuItem) => item.name === name);
  }
}
