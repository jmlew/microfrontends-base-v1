import { Container } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import './styles.scss';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { Route } from 'react-router-dom';
import { appInterface } from '../../core/helpers';
import FooMain from '../../features/foo/views/FooMain';
import AppHeader from '../../layout/AppHeader/Header';
import { appRouteConfig } from '../../root/app-route-config.constant';
import Details from '../../shared/components/Details';

interface ShellViewProps {}

export default function ShellView(props: ShellViewProps) {
  const unsubscriber: Subject<unknown> = new Subject();
  const [appName, setAppName] = useState(null);
  const [appDescription, setAppDescription] = useState(null);

  useEffect(() => {
    subscribeToAppDetails();
    return () => {
      unsubscribe();
    };
  }, []);

  function subscribeToAppDetails() {
    appInterface.appDetails$
      .pipe(
        takeUntil(unsubscriber),
        filter((details: ClientAppDetails) => details != null)
      )
      .subscribe(setAppDetails);
  }

  function setAppDetails(details: ClientAppDetails) {
    const { name, description } = details;
    setAppName(name);
    setAppDescription(description);
  }

  function unsubscribe() {
    fromCommonUtils.destroy(unsubscriber);
  }

  const featureFooRoutePath: string = appRouteConfig.featureFoo.name;
  return (
    <Fragment>
      <AppHeader appName={appName} />
      <div className="app-content">
        <Details appDescription={appDescription} />
        <Route path={featureFooRoutePath}>
          <FooMain />
        </Route>
      </div>
    </Fragment>
  );
}
