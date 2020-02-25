import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import './styles.scss';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import { theme } from '@microfr/shared/ui-react';
import { usePrevious } from '@microfr/shared/util-react';
import { appInterface } from '../core/helpers';
import ShellView from '../views/Shell';

// TODO: implement styled components alongside SASS.
// import { themeColours } from '@microfr/shared/ui';
// import styled from 'styled-components';

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
    <MuiThemeProvider theme={theme}>
      {/* TODO: Provide view through router */}
      {/* TODO: Apply root styles to main container custom component if possible */}
      <div className="app-root">
        <ShellView />
      </div>
    </MuiThemeProvider>
  );
}
