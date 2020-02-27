import React from 'react';

import { ClientApp, OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { evtBusDom, evtBusObs } from '../../../../core/helpers';
import CommToAppForm from '../../components/CommToAppForm';

export default function CommToApp() {
  function handleSendMessage(message: string) {
    const data: OrangeAppMessage = {
      toApp: ClientApp.Orange,
      fromApp: ClientApp.Blue,
      message,
    };
    evtBusObs.dispatch({
      type: EvtBusActionType.SendClientOrangeMessage,
      payload: data,
    });
    evtBusDom.dispatch(EvtBusEventType.SendClientOrangeMessage, data);
  }
  return <CommToAppForm onSendMessage={handleSendMessage} />;
}
