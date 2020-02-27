import { Button, makeStyles, Theme } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { RouteItem } from '../../../../shared/models';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    textTransform: 'inherit',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

interface FooNavBarButtonProps {
  route: RouteItem;
}

export default function FooNavButton({ route }: FooNavBarButtonProps) {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.button}>
      <Icon className={classes.icon}>{route.icon}</Icon>
      {route.label}
    </Button>
  );
}
