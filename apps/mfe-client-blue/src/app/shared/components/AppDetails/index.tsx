import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { themeColours } from '@microfr/shared/ui';
import React from 'react';

const useStyles = makeStyles({
  card: {
    marginBottom: 20,
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  description: {
    fontSize: 16,
    color: themeColours.grey800,
  },
});

export default function AppDetails({ appDescription }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box display="flex" justifyContent="center">
          <Typography className={classes.description}>
            {appDescription || 'App description to go here...'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
