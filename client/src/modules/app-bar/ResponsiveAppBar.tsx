import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { compose } from 'recompose'
import { observer } from 'mobx-react';
import { observable } from 'mobx';

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
import LocalBar from '@material-ui/icons/LocalBar';
import Info from '@material-ui/icons/Info';
import Restaurant from '@material-ui/icons/Restaurant';
import Place from '@material-ui/icons/Place';
import Favorite from '@material-ui/icons/Favorite';

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
interface IState {}

/**
 * Renders the title bar, sidebar, and main content.
 * 
 * The main content rendered depends on the children passed in which depends on the path of the url.
 */
@observer
class MiniDrawer extends React.Component<IProps, IState> {
  @observable selectedMenu: string = 'favorite';
  @observable drawerOpen: boolean = false;

  handleDrawerOpen = () => {
    this.drawerOpen = true;
  };

  handleDrawerClose = () => {
    this.drawerOpen = false;
  };

  handleListItemClick = (event: React.MouseEvent, value: string) => {
    this.selectedMenu = value;
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" noWrap>
              <Link to="/" className="app-title">
                CLT ATTR
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.drawerOpen && classes.drawerPaperClose),
          }}
          open={this.drawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/favorite" className="menu">
              <ListItem button={true} selected={this.selectedMenu === 'favorite'} onClick={event => this.handleListItemClick(event, 'favorite')}>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/place" className="menu">
              <ListItem button={true} selected={this.selectedMenu === 'place'} onClick={event => this.handleListItemClick(event, 'place')}>
                <ListItemIcon>
                  <Place />
                </ListItemIcon>
                <ListItemText primary="Places" />
              </ListItem>
            </Link>
            <Link to="/restaurant" className="menu">
              <ListItem button={true} selected={this.selectedMenu === 'restaurant'} onClick={event => this.handleListItemClick(event, 'restaruant')}>
                <ListItemIcon>
                  <Restaurant />
                </ListItemIcon>
                <ListItemText primary="Restaurants" />
              </ListItem>
            </Link>
            <Link to="/localbar" className="menu">
              <ListItem button={true} selected={this.selectedMenu === 'localbar'} onClick={event => this.handleListItemClick(event, 'localbar')}>
                <ListItemIcon>
                  <LocalBar />
                </ListItemIcon>
                <ListItemText primary="Local Bars" />
              </ListItem>
            </Link>
            <Link to="/info" className="menu">
              <ListItem button={true} selected={this.selectedMenu === 'info'} onClick={event => this.handleListItemClick(event, 'info')}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="Info" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}


export const ResponsiveAppBar = compose(withRouter, withStyles(styles, { withTheme: true }))(MiniDrawer);