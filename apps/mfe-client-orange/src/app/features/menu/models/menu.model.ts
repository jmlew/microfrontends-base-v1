import { IconMat } from '@microfr/shared/ui';
import { ButtonLabel, ButtonName } from '../enums/menu.enum';

export interface MenuItem {
  name: ButtonName;
  label?: ButtonLabel;
  icon?: IconMat;
}
