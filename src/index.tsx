import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import "typeface-roboto";
import './sass/main.css';

import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme();

function CltAttr() {
  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  )
}

ReactDOM.render(
  <CltAttr />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
