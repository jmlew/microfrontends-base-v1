import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import styled from 'styled-components';

import { themeColours } from '@microfr/shared/ui';
import { theme } from '@microfr/shared/ui-react';
import { EvtBusEventItem, EvtBusEventType } from '@microfr/shared/util/event-bus-dom';
import { EvtBusAction, EvtBusActionType } from '@microfr/shared/util/event-bus-obs';
import { appConfig } from '../../shared/constants';
import { evtBusDom, evtBusObs } from '../../shared/helpers';

const StyledAppRoot = styled.div`
  main {
    padding: 20px;
    background-color: ${themeColours.grey300};
    text-align: center;
  }
`;

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
        <StyledAppRoot>
          <main>
            <img
              src="/assets/images/react.png"
              alt="React Logo"
              className="framework-logo"
            />
            <Button variant="contained" color="primary" onClick={this.handleFooClick}>
              Test global state action
            </Button>
          </main>
        </StyledAppRoot>
      </MuiThemeProvider>
    );
  }
}

export default AppRoot;
