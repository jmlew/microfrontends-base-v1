import { IconMat } from '@microfr/shared/ui';
import { ElementName, ElementRoute } from '@microfr/shell';
import { ButtonLabel, ButtonName } from '../enums/menu.enum';
import { MenuItem } from '../models/menu.model';

export const menuItems: MenuItem[] = [
  {
    name: ButtonName.ClientRed,
    label: ButtonLabel.ClientRed,
    icon: IconMat.Apps,
  },
  {
    name: ButtonName.ClientBlue,
    label: ButtonLabel.ClientBlue,
    icon: IconMat.Apps,
  },
];

export const menuToClientElementMap: { [name: string]: ElementName } = {
  [ButtonName.ClientRed]: ElementName.ClientRed,
  [ButtonName.ClientBlue]: ElementName.ClientBlue,
};

export const menuToClientRouteMap: { [name: string]: ElementRoute } = {
  [ButtonName.ClientRed]: ElementRoute.ClientRed,
  [ButtonName.ClientBlue]: ElementRoute.ClientBlue,
};
