import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  TextField,
  makeStyles,
  Link,
  Hidden,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { 
  welcomeMessage,
  blueButton,
  alignCenter,
  preLoginInput,
  inputLabel,
  inputContainer,
  fillContainer,
  endCapLogin,
  endCapLoginSmall,
} from './loginRegStyle';
import TopNav from "./TopNav";

const useStyles = makeStyles({
  welcomeMessage,
  blueButton,
  alignCenter,
  preLoginInput,
  inputLabel,
  inputContainer,
  fillContainer,
  endCapLogin,
  endCapLoginSmall,

  linkContainer: {
    width: "100%",
    textAlign: "right",
  },
  forgotPassword: {
    color: "#3A8DFF",
    fontSize: "0.75rem",
    fontWeight: "600",
    position: "relative",
    textAlign: "right",
    top: "-1.70rem",
    right: ".7rem",
  },
});

const Login = (props) => {
  const classes = useStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container  
      direction="column"
      justifyContent="space-between"
      className={classes.fillContainer}>

      <TopNav whiteButtonText="Create account" softTextText="Don't have an account?" pushTo="/register"/>

      <Grid item className={classes.inputContainer}>
        <form onSubmit={handleLogin}>
          <Typography className={classes.welcomeMessage}>Welcome back!</Typography>

          <Grid item>
            <FormControl className={classes.preLoginInput}>
              <InputLabel aria-label="username label" className={classes.inputLabel}>Username</InputLabel>
              <TextField
                aria-label="username"
                name="username"
                type="text"
                required
              />
            </FormControl>
          </Grid>
          
          <Grid item>
            <FormControl className={classes.preLoginInput}>
              <InputLabel aria-label="password label" className={classes.inputLabel}>Password</InputLabel>
              <TextField
                aria-label="password"
                name="password"
                type="password"
                required
              />
            </FormControl>
            <div className={classes.linkContainer}>
              <Link href="#" className={classes.forgotPassword}>Forgot?</Link>
            </div>
          </Grid>

          <Grid item className={classes.alignCenter}>
            <Button type="submit" className={classes.blueButton} variant="contained" aria-label="login">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>

      <Hidden smDown>
        <Grid item className={classes.endCapLogin}></Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item className={classes.endCapLoginSmall}></Grid>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
