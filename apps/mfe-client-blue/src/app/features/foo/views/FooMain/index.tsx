import React from 'react';

import { appRouteConfig } from '../../../../root/app-route-config.constant';
import { RouteItem } from '../../../../shared/models/routes.model';
import FooNav from '../../components/FooNav';

function FooMain() {
  const routes: RouteItem[] = [appRouteConfig.featureFooA, appRouteConfig.featureFooB];
  return <FooNav routes={routes} />;
}

export default FooMain;
