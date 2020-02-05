import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import React from 'react';
import styled from 'styled-components';

import { theme, themeColours } from '@microfr/shared/ui-react';

import { ShellActionType } from '@microfr/shell';
import { shellStateHelper } from '../../shared/helpers';

const StyledApp = styled.div`
  main {
    padding: 20px;
    background-color: ${themeColours.grey500};
    text-align: center;
  }
`;

export const AppRoot = () => {
  const onFooClick = () => {
    shellStateHelper.dispatch({
      type: ShellActionType.Foo,
      payload: 'Fired from React App A',
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <StyledApp>
        <main>
          <Typography variant="h4" gutterBottom={true}={true}>
            React App content: Client A
          </Typography>
          <Button variant="contained" color="primary" onClick={onFooClick}>
            Test global state action
          </Button>
        </main>
      </StyledApp>
    </MuiThemeProvider>
  );
};

export default AppRoot;
