import React from 'react';

import styled from 'styled-components';

const StyledApp = styled.div`
  main {
    padding: 20px;
    background-color: grey;
    text-align: center;
  }

  h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
    color: pink;
  }
`;

export const AppRoot = () => {
  return (
    <StyledApp>
      <main>
        <h3>React App content: Client A</h3>
      </main>
    </StyledApp>
  );
};

export default AppRoot;
