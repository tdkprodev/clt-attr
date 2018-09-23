import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { createStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import Code from '@material-ui/icons/Code';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Favorite from '@material-ui/icons/Favorite';
import Info from '@material-ui/icons/Info';
import LocalBar from '@material-ui/icons/LocalBar';
import MenuIcon from '@material-ui/icons/Menu';
import Place from '@material-ui/icons/Place';
import Restaurant from '@material-ui/icons/Restaurant';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    minHeight: "100vh", // #TK for scrollabilty
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

interface IProps {
  classes: any;
  theme: any;
}

/**
 * Renders the title bar, sidebar, and main content.
 * The main content rendered depends on the children passed in which depends on the path of the url.
 */
@observer
class MiniDrawer extends React.Component<IProps, {}> {
  @observable private selectedMenu: string | undefined = 'favorite';
  @observable private drawerOpen: boolean = false;

  public handleDrawerOpen = () => {
    this.drawerOpen = true;
  };

  public handleDrawerClose = () => {
    this.drawerOpen = false;
  };

  public handleListItemClick = (event: React.MouseEvent<HTMLElement>) => {
    this.selectedMenu = event.currentTarget.dataset.menu;
  };

  public render() {
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
            <Link to="/sink" className="menu">
              <ListItem
                button
                selected={this.selectedMenu === 'sink'}
                data-menu="sink"
                onClick={this.handleListItemClick}
              >
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText primary="Sink" />
              </ListItem>
            </Link>
            <Link to="/favorite" className="menu">
              <ListItem
                button
                selected={this.selectedMenu === 'favorite'}
                data-menu="favorite"
                onClick={this.handleListItemClick}
              >
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/place" className="menu">
              <ListItem
                button
                selected={this.selectedMenu === 'place'}
                data-menu="place"
                onClick={this.handleListItemClick}
              >
                <ListItemIcon>
                  <Place />
                </ListItemIcon>
                <ListItemText primary="Places" />
              </ListItem>
            </Link>
            <Link to="/restaurant" className="menu">
              <ListItem
                button
                selected={this.selectedMenu === 'restaurant'}
                data-menu="restaurant"
                onClick={this.handleListItemClick}
              >
                <ListItemIcon>
                  <Restaurant />
                </ListItemIcon>
                <ListItemText primary="Restaurants" />
              </ListItem>
            </Link>
            <Link to="/localbar" className="menu">
              <ListItem
                button
                selected={this.selectedMenu === 'localbar'}
                data-menu="localbar"
                onClick={this.handleListItemClick}
              >
                <ListItemIcon>
                  <LocalBar />
                </ListItemIcon>
                <ListItemText primary="Local Bars" />
              </ListItem>
            </Link>
            <Link to="/info" className="menu">
              <ListItem
                button
                selected={this.selectedMenu === 'info'}
                data-menu="info"
                onClick={this.handleListItemClick}
              >
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