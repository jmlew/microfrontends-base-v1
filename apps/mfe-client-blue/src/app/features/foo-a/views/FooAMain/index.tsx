import { Divider, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment } from 'react';

import FeatureDetails from '../../../../shared/components/FeatureDetails';
import CommToApp from '../../containers/CommToApp';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function FooAMainView() {
  const classes = useStyles();
  return (
    <Fragment>
      <FeatureDetails title={'Feature Foo A'} caption={'via route: red/foo-a)'} />
      <Divider className={classes.divider} />
      <CommToApp />
    </Fragment>
  );
}
