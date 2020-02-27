import { Box, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
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
  link: {
    textDecoration: 'none',
  },
});

interface FooNavBarProps {
  routes: RouteItem[];
  relativeUrl: string;
}

const FooNav = ({ routes, relativeUrl }: FooNavBarProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box display="flex" justifyContent="center">
          {routes.map((route: RouteItem, i: number) => (
            <NavLink
              key={`btn-${i}`}
              to={relativeUrl + route.name}
              className={classes.link}
            >
              <FooNavButton route={route} />
            </NavLink>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FooNav;
