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

  button {
    padding: 10px 20px;
    font-size: 16px;
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
        <h3>React App content: Client A</h3>
        <button onClick={onFooClick}>Test global state action</button>
      </main>
    </StyledApp>
  );
};

export default AppRoot;
