import * as React from 'react';
import { Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography } from '@material-ui/core';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

import { Link } from 'react-router-dom';

import LockIcon from '@material-ui/icons/Lock';

const styles = (theme: Theme) => createStyles({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    opacity: .92,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  guess: {
    marginTop: theme.spacing.unit * 3,
    textDecoration: 'none',
  }
});

interface IProps {
  handleSignIn?(): void;
}

function SignIn(props: IProps & WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          <form className={classes.form} onSubmit={props.handleSignIn}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Link to="/sink">
              <Button
                type="button"
                variant="flat"
                color="secondary"
                className={classes.guess}
              >
                Guess access
            </Button>
            </Link>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles)(SignIn);