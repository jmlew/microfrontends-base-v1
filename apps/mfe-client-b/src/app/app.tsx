import React from 'react';

import styled from 'styled-components';

import { Route, Link } from 'react-router-dom';

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

export const App = () => {
  return (
    <StyledApp>
      <main>
        <h3>React App content: Client-B</h3>
      </main>
      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      /> */}
    </StyledApp>
  );
};

export default App;
