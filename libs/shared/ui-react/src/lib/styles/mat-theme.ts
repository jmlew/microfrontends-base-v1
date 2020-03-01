import red from '@material-ui/core/colors/red';

import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { themeColours } from '@microfr/shared/ui';

const muiTheme: Theme = createMuiTheme({
  spacing: (value) => `${0.25 * value}rem`, // Match ui-variables/_layout.scss.
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
  props: {
    /* MuiTypography: {
      // Add overrides.
    }, */
  },
});

export { muiTheme };
