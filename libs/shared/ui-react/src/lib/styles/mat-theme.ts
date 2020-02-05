import red from '@material-ui/core/colors/red';
import { themeColours } from './theme-colors';

import { createMuiTheme, Theme } from '@material-ui/core/styles';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: themeColours.primary,
      light: themeColours.primaryLight,
      dark: themeColours.primaryDark,
    },
    secondary: {
      main: themeColours.secondary,
      light: themeColours.secondaryLight,
      dark: themeColours.secondaryDark,
    },
    error: red,
  },
});

export { theme };
