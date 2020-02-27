import React, { Fragment } from 'react';

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { appRouteConfig } from '../../../../root/app-route-config.constant';
import { RouteItem } from '../../../../shared/models/routes.model';
import FooAMainView from '../../../foo-a/views/FooAMain';
import FooBMainView from '../../../foo-b/views/FooBMain';
import FooNav from '../../components/FooNav';

function FooMain() {
  const routes: RouteItem[] = [appRouteConfig.featureFooA, appRouteConfig.featureFooB];
  const { path, url } = useRouteMatch();
  return (
    <Fragment>
      <FooNav routes={routes} relativeUrl={url} />
      <div className="client-app-section">
        <Switch>
          <Route path={path + appRouteConfig.featureFooA.name}>
            <FooAMainView />
          </Route>
          <Route path={path + appRouteConfig.featureFooB.name}>
            <FooBMainView />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default FooMain;
