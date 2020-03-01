import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './styles.scss';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import { muiTheme } from '@microfr/shared/ui-react';
import { usePrevious } from '@microfr/shared/util-react';
import { appInterface } from '../core/helpers';
import ShellView from '../views/Shell';

export interface AppRootProps {
  appDetails: ClientAppDetails;
}

export default function AppRoot(props: AppRootProps) {
  /**
   * Initialises subscriptions to each event bus on mount and unsubscribes on unmount.
   */
  useEffect(() => {
    appInterface.initEvtBusObs();
    appInterface.initEvtBusDom();
    return () => {
      appInterface.destroy();
    };
  }, []);

  /**
   * handles updates to input property changes on each up date to props.
   */
  const prevProps: AppRootProps = usePrevious(props);
  useEffect(() => appInterface.handleInputProperyChanges(props, prevProps), [props]);

  return (
    <HashRouter>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline>
          <div className="app-root">
            <Switch>
              <Route path="/">
                <ShellView />
              </Route>
            </Switch>
          </div>
        </CssBaseline>
      </MuiThemeProvider>
    </HashRouter>
  );
}
