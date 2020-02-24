import React, { Fragment } from 'react';
import './styles.scss';

import { AppHeader } from '../../layout/AppHeader/Header';
import { Details } from '../../shared/components/Details';

export const ShellView = () => {
  const appName = 'Sample App Name';
  const appDescription = 'Sample React App Desc';

  return (
    <Fragment>
      <AppHeader appName={appName} />
      <div className="app-content">
        <Details appDescription={appDescription} />
        {/* <router-outlet/>*/}
      </div>
    </Fragment>
  );
};
