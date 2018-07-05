import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const Roboto300 = { fontFamily: 'Roboto300, sans-serif' };
const Roboto400 = { fontFamily: 'Roboto400, sans-serif' };
const Roboto500 = { fontFamily: 'Roboto500, sans-serif' };
const success = {
  main: green[500],
  dark: green[800],
  contrastText: 'white',
};
const warning = {
  main: amber[500],
  dark: amber[700],
  light: amber[200],
  contrastText: 'rgba(0, 0, 0, 0.87)',
};
const error = {
  main: red[500],
  dark: red[700],
  light: red[300],
  contrastText: 'white',
};
const theme = createMuiTheme({
  palette: {
    error: {
      ...red,
      ...error,
    },
    success: {
      ...green,
      ...success,
    },
    warning: {
      ...amber,
      ...warning,
    },
    info: {
      ...blue,
      contrastText: 'white',
    },
  },
  typography: {
    ...Roboto400,
    display4: Roboto300,
    display3: Roboto400,
    display2: Roboto400,
    display1: Roboto400,
    headline: Roboto400,
    title: Roboto500,
    subheading: Roboto400,
    body2: Roboto500,
    body1: Roboto400,
    caption: Roboto400,
    button: Roboto500,
  },
  spacing: {
    unit: 8,
    double: 16,
    triple: 24,
    quad: 32,
  },
});

export default {
  ...theme,
  styleguide: {
    fontFamily: {
      base: theme.typography.fontFamily,
    },
    fontSize: {
      base: theme.typography.fontSize - 1,
      text: theme.typography.fontSize,
      small: theme.typography.fontSize - 2,
    },
  },
};
