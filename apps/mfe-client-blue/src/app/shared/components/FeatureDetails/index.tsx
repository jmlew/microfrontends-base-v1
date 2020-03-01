import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { themeColours } from '@microfr/shared/ui';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    ...theme.typography.body2,
    color: themeColours.grey800,
  },
  caption: {
    ...theme.typography.caption,
    paddingLeft: theme.spacing(1),
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
    <Box display="flex" alignItems="flex-end">
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.caption}>{caption}</Typography>
    </Box>
  );
}
