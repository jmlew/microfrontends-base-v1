import { TemplateRef } from '@angular/core';
import { IconMat } from '@microfr/shared/ui';
import { MenuName } from '../enums/menu.enum';

export interface MenuItem {
  name: MenuName;
  label: string;
  content?: TemplateRef<any>;
  icon?: IconMat;
}
