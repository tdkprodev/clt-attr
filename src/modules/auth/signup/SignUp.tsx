import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

import LockIcon from "@material-ui/icons/Lock";

import { IStatusValue } from '@store/index';
import { authStore } from '@modules/auth/store';

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "auto",
      display: "block", // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
      opacity: 0.92
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    },
    guess: {
      marginTop: theme.spacing.unit * 3,
      textDecoration: "none"
    },
    rowLayout: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: ".3rem"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between"
    }
  });

interface IProps { }

type SignUpField = "firstName" | "lastName" | "password" | "passwordConfirmation" | "email";

@observer
class SignUp extends React.Component<IProps & WithStyles<typeof styles>> {
  @observable firstName: IStatusValue = { value: '' };
  @observable lastName: IStatusValue = { value: '' };
  @observable
  password: IStatusValue = { value: '' };
  @observable
  passwordConfirm: IStatusValue = { value: '' };
  @observable
  email: IStatusValue = { value: '' };

  public handleInputChange = (field: SignUpField) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;

    this[field] = {
      value,
      error: ''
    }
  };

  public handleSignUp = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { value: email } = this.email;
    const { value: password } = this.password;

    if (email && password) {
      authStore.sendSignup(email, password);
    } else {
      authStore.setLogin({
        loading: false,
        error: 'Missing required field',
        value: '',
      });
    }
  };

  render() {
    const { classes } = this.props;

    const loginError = authStore.login.error;
    console.log('---------------', loginError);

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign Up</Typography>
            <form className={classes.form} onSubmit={this.handleSignUp}>
              <div className={classes.rowLayout}>
                <FormControl margin="normal">
                  <InputLabel htmlFor="first-name">First name</InputLabel>
                  <Input
                    id="firstname"
                    name="first-name"
                    value={this.firstName.value || ""}
                    onChange={this.handleInputChange("firstName")}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal">
                  <InputLabel htmlFor="last-name">Last name</InputLabel>
                  <Input
                    id="last-name"
                    name="last-name"
                    value={this.lastName.value || ""}
                    onChange={this.handleInputChange("lastName")}
                  />
                </FormControl>
              </div>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={this.email.value || ""}
                  onChange={this.handleInputChange("email")}
                />
              </FormControl>
              <div className={classes.rowLayout}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    value={this.password.value || ""}
                    onChange={this.handleInputChange("password")}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password-confirmation">Confirm password</InputLabel>
                  <Input
                    name="password-confirmation"
                    type="password"
                    id="password-confirmation"
                    value={this.passwordConfirm.value || ""}
                    onChange={this.handleInputChange("passwordConfirmation")}
                  />
                </FormControl>
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Button
                  type="button"
                  variant="flat"
                  color="secondary"
                  className={classes.submit}
                >
                  Sign in
              </Button>
              </div>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignUp);
