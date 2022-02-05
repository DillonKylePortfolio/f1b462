import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
  makeStyles,
  Hidden,
} from "@material-ui/core";
import {
  createAccountMessage,
  endCapRegister,
  inputContainer,
  fillContainer,
  offsetForm,
  preLoginInputSquished,
  inputLabel,
  blueButton,
  alignCenter,
} from './loginRegStyle'
import { register } from "./store/utils/thunkCreators";
import TopNav from "./TopNav";

const useStyles = makeStyles({
  createAccountMessage,
  endCapRegister,
  inputContainer,
  fillContainer,
  offsetForm,
  preLoginInputSquished,
  inputLabel,
  blueButton,
  alignCenter,
});

const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container  
      direction="column"
      justifyContent="space-between"
      className={classes.fillContainer}>

      <TopNav whiteButtonText="Login" softTextText="Already have an account?" pushTo="/login"/>

      <Grid item className={classes.inputContainer}>
        <form onSubmit={handleRegister} className={classes.offsetForm}>
          <Typography className={classes.createAccountMessage}>Create an account.</Typography>

          <Grid>
            <Grid>
              <FormControl className={classes.preLoginInputSquished}>
                <InputLabel aria-label="username label" className={classes.inputLabel}>Username</InputLabel>
                <TextField
                  aria-label="username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.preLoginInputSquished}>
                <InputLabel aria-label="email label" className={classes.inputLabel}>E-mail address</InputLabel>
                <TextField
                  aria-label="email"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.preLoginInputSquished}
                error={!!formErrorMessage.confirmPassword}>
                <InputLabel aria-label="password label" className={classes.inputLabel}>Password</InputLabel>
                <TextField
                  aria-label="password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
                <FormControl className={classes.preLoginInputSquished}
                  error={!!formErrorMessage.confirmPassword}>
                  <InputLabel aria-label="confirm password label" className={classes.inputLabel}>Confirm Password</InputLabel>
                  <TextField
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item className={classes.alignCenter}>
              <Button type="submit" className={classes.blueButton} variant="contained" aria-label="create account">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>

      </Grid>

      <Hidden smDown>
        <Grid item className={classes.endCapRegister}></Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item className={classes.endCapRegisterSmall}></Grid>
      </Hidden>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
