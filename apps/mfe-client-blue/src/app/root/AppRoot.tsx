import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import './styles.scss';

import { theme } from '@microfr/shared/ui-react';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { appConfig } from '../core/constants';
import { evtBusDom, evtBusObs } from '../shared/helpers';
import { ShellView } from '../views/Shell';

// TODO: implement styled components alongside SASS.
// import { themeColours } from '@microfr/shared/ui';
// import styled from 'styled-components';

export class AppRoot extends React.Component {
  private evtBusObsDestroy: Subject<unknown> = new Subject();
  private evtBusDomItems: EvtBusEventItem[] = [];

  componentDidMount() {
    this.listenToEvtBusDom();
    this.listenToEvtBusObs();
  }

  componentWillUnmount() {
    evtBusObs.destroy(this.evtBusObsDestroy);
    evtBusDom.destroy(this.evtBusDomItems);
  }

  private listenToEvtBusDom() {
    evtBusDom.addEventItem(
      {
        type: EvtBusEventType.SampleEvent,
        listener: (event: CustomEvent) => {
          console.log(`Event received by ${appConfig.label}:`, event.detail);
        },
      },
      this.evtBusDomItems
    );
  }

  private listenToEvtBusObs() {
    evtBusObs.actions$
      .pipe(takeUntil(this.evtBusObsDestroy))
      .subscribe((action: EvtBusAction) => {
        if (action) {
          console.log(`Action received by ${appConfig.label}:`, action);
        }
      });
  }

  handleFooClick = () => {
    const sampleEventData = { payload: 'Fired from React App A' };
    evtBusObs.dispatch({
      type: EvtBusActionType.SampleAction,
      payload: sampleEventData,
    });
    evtBusDom.dispatch(EvtBusEventType.SampleEvent, sampleEventData);
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {/* TODO: Provide view through router */}
        {/* TODO: Apply root styles to main container custom component if possible */}
        <div className="app-root">
          <ShellView />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppRoot;
