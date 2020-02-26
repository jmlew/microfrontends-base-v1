import React from 'react';
import './styles.scss';

import { HeaderLogo } from './HeaderLogo';

interface AppHeaderProps {
  appName: string;
}

export default function AppHeader({ appName }: AppHeaderProps) {
  const appNamePrefix = 'Blue Client App';
  return (
    <div className="app-header">
      <span className="header-label">{appNamePrefix}</span>
      <span className="header-label"> : {appName} </span>
      <HeaderLogo />
    </div>
  );
}
