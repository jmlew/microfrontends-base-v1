import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import React from 'react';
import styled from 'styled-components';

import { ShellActionType } from '@microfr/shell';
import { shellStateHelper } from '../../shared/helpers';

const StyledApp = styled.div`
  main {
    padding: 20px;
    background-color: grey;
    text-align: center;
  }

  h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
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
    <StyledApp>
      <main>
        <Typography variant="h4" gutterBottom>
          React App content: Client A
        </Typography>
        <Button variant="contained" color="primary" onClick={onFooClick}>
          Test global state action
        </Button>
      </main>
    </StyledApp>
  );
};

export default AppRoot;
