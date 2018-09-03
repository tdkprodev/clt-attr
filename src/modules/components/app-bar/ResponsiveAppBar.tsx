import * as React from 'react';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Home from '@material-ui/icons/Home';
import LocalBar from '@material-ui/icons/LocalBar';
import Info from '@material-ui/icons/Info';
import Restaurant from '@material-ui/icons/Restaurant';
import Place from '@material-ui/icons/Place';

// import {About} from '@components/about';

const drawerWidth = 240;

const styles: any = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

interface IProps {
  classes: any;
  theme: any;

}

interface IState {
  open: boolean;
}

class MiniDrawer extends React.Component<IProps, IState> {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenuClick = (path: string) => () => {
    alert(`${path} clicked`);
    // @ts-ignore
    this.props.history.push(`/${path.toLowerCase()}`);
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button={true} onClick={this.handleMenuClick('Home')}>
              <ListItemIcon>
                 <Home /> 
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button={true} onClick={this.handleMenuClick('Places')}>
              <ListItemIcon>
                 <Place /> 
              </ListItemIcon>
              <ListItemText primary="Places" />
            </ListItem>
            <ListItem button={true} onClick={this.handleMenuClick('Restaurants')}>
              <ListItemIcon>
                 <Restaurant /> 
              </ListItemIcon>
              <ListItemText primary="Restaurants" />
            </ListItem>
            <ListItem button={true} onClick={this.handleMenuClick('Local Bars')}>
              <ListItemIcon>
                 <LocalBar /> 
              </ListItemIcon>
              <ListItemText primary="Local Bars" />
            </ListItem>
            <ListItem button={true} onClick={this.handleMenuClick('Info')}>
              <ListItemIcon>
                 <Info /> 
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {this.renderBody()}
        </main>
      </div>
    );
  }

  renderBody = () => {
    console.log(window.location.pathname);
    const path = window.location.pathname.split('/').pop();

    switch (path) {
      case ('home'):
        return <div>WELCOME HOME</div>;
      default:
        return <div>NOWHERE</div>;
    }

  }
}


export const ResponsiveAppBar = compose(withRouter, withStyles(styles, { withTheme: true }))(MiniDrawer);