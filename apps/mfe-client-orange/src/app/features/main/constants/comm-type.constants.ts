import { PropStringMap } from '@microfr/shared/model/common';
import { CommType } from '../enums/comm-type.enum';

export const commTypeLabelsMap: PropStringMap = {
  [CommType.ComponentProp]: 'Native Web Component Properties',
  [CommType.EvtBusDom]: 'DOM API Custom Events Event Bus',
  [CommType.EvtBusObs]: 'RxJS Observer Event Bus',
};
