import { Box, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { match } from 'react-router';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { RouteItem } from '../../../../shared/models';
import FooNavButton from '../FooNavButton';

const useStyles = makeStyles({
  card: {
    marginBottom: 20,
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
});

interface FooNavBarProps {
  routes: RouteItem[];
}

const FooNav = ({ routes }: FooNavBarProps) => {
  const classes = useStyles();
  const activatedRoute: match = useRouteMatch();

  return (
    // tslint:disable-next-line: jsx-wrap-multiline
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box display="flex" justifyContent="center">
          {routes.map((route: RouteItem, i: number) => (
            <NavLink key={`btn-${i}`} to={activatedRoute.url + route.name}>
              <FooNavButton route={route} />
            </NavLink>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FooNav;
