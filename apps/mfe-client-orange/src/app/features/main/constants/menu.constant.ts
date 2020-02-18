import { IconMat } from '@microfr/shared/ui';
import { MenuName } from '../enums/menu.enum';
import { MenuItem } from '../models/menu.model';

export const menuItems: MenuItem[] = [
  {
    name: MenuName.CommunicationType,
    label: 'Communication Type',
    icon: IconMat.Apps,
  },
  {
    name: MenuName.CommunicationTo,
    label: 'To Apps',
    icon: IconMat.ArrowUp,
  },
  {
    name: MenuName.CommunicationFrom,
    label: 'From Apps',
    icon: IconMat.ArrowDown,
  },
];
