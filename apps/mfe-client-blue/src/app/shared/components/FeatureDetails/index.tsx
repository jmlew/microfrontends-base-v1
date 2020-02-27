import { Box, makeStyles, Typography } from '@material-ui/core';
import { themeColours } from '@microfr/shared/ui';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 16,
    color: themeColours.grey800,
  },
  caption: {
    paddingLeft: theme.spacing(1),
    fontSize: 16,
    color: themeColours.grey600,
  },
}));

interface FeatureDetailsProps {
  title: string;
  caption: string;
}

export default function FeatureDetails({ title, caption }: FeatureDetailsProps) {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.caption}>{caption}</Typography>
    </Box>
  );
}
