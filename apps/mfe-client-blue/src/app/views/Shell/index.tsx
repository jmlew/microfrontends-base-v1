import React, { Fragment, useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import './styles.scss';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { appInterface } from '../../core/helpers';
import { AppHeader } from '../../layout/AppHeader/Header';
import { Details } from '../../shared/components/Details';

export default function ShellView() {
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

  return (
    <Fragment>
      <AppHeader appName={appName} />
      <div className="app-content">
        <Details appDescription={appDescription} />
        {/* <router-outlet/>*/}
      </div>
    </Fragment>
  );
}
