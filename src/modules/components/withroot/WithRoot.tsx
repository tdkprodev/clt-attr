import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, green, } from '@material-ui/core/colors';

import { CssBaseline } from '@material-ui/core';

// A theme with custom primary and secondary color.
// It's optional
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot;
}

export default withRoot;


/**
 * HOW TO USE
 * Wrap WithRoot around your custom component
 * i.e
 * 
 * const MyCustomComponent = (props) => (<div>I'm one of a kind</div>)
 * 
 * export default WithRoot(MyCustomComponent);
 * 
 * 
 */