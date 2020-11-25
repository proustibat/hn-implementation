import { red } from '@material-ui/core/colors';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

const Cralga: Theme = createMuiTheme({
  palette: {
    common: {
      black: 'rgb(40,40,40)',
      white: 'rgba(202,202,202,0.5)',
    },
    background: {
      default: 'rgb(255,255,255)',
      paper: 'rgb(238,238,238)',
    },
    primary: {
      main: '#19857b',
    },
    secondary: {
      main: '#6d8500',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: 'rgb(40,40,40)',
      secondary: 'rgba(202,202,202)',
      disabled: 'rgba(155, 155, 155, 1)',
      hint: 'rgba(74, 74, 74, 1)',
    },
  },
});

const Brownwave: Theme = createMuiTheme({
  palette: {
    common: {
      black: 'rgba(139, 87, 42, 1)',
      white: 'rgba(139, 87, 42, 0.5)',
    },
    background: {
      default: 'rgb(255,255,255)',
      paper: 'rgb(238,238,238)',
    },
    primary: {
      main: 'rgba(245, 86, 35, 1)',
    },
    secondary: {
      main: 'rgba(245, 179, 0, 1)',
    },
    error: {
      main: 'rgba(208, 2, 27, 1)',
    },
    text: {
      primary: 'rgba(139, 87, 42, 1)',
      secondary: 'rgba(139, 87, 42, 0.63)',
      disabled: 'rgba(155, 155, 155, 1)',
      hint: 'rgba(74, 74, 74, 1)',
    },
  },
});

const themes = {
  Cralga,
  Brownwave,
};
export default themes;
