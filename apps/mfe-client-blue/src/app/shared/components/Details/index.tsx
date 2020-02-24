import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';

export const Details = ({ appDescription }) => (
  <Card>
    <CardContent>{appDescription || 'App description to go here...'}</CardContent>
  </Card>
);
