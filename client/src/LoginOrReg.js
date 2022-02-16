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
  makeStyles,
  Link,
  Hidden,
  FormHelperText,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { register } from "./store/utils/thunkCreators";
import TopNav from "./TopNav";

const useStyles = makeStyles({
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
  welcomeMessage: {
    fontSize: "1.625rem",
    color: "#000",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  createAccountMessage: {
    fontSize: "1.625rem",
    color: "#000",
    fontWeight: "600",
    marginBottom: "-0.5rem",
    marginLeft: "-.3rem",
    whiteSpace: "nowrap",
  },
  blueButton: {
    backgroundColor: "#3A8DFF",
    color: "#FFFFFF",
    width: "10rem",
    height: "3.5rem",
    borderRadius: "0.1875",
    marginTop: "2.55rem",
    fontSize: "1rem",
  },
  alignCenter: {
    textAlign: "center",
  },
  offsetForm: {
    position: "relative",
    top: "2.8rem",
  },
  inputLabel: {
    fontSize: "0.875rem",
    position: "absolute",
    top: "-3.4rem",
    color: "#B0B0B0",
  },
  preLoginInput: {
    position: "relative",
    marginTop: "4.5rem",
    width: "100%",
    fontSize: "0.875rem",
    fontWeight: "600",
    borderColor: "#D5DFEE;",
  },
  preLoginInputSquished: {
    position: "relative",
    marginTop: "3.5rem",
    width: "100%",
    fontSize: "0.875rem",
    fontWeight: "600",
    borderColor: "#D5DFEE;",
  },
  inputContainer: {
    width: "63%",
    marginLeft: "16%",
    marginRight: "21%",
  },
  fillContainer: {
    width: "100%",
    height: "100%",
  },
  topCap: {
    height: "15%",
  },
  topCapSmall: {
    height: "30%",
  },
  endCapLogin: {
    height: "8%",
  },
  endCapLoginSmall: {
    margin: "-2rem",
  },
  endCapRegister: {
    height: "11%",
  },
});


function LoginOrReg(props) {
  const classes = useStyles();
  const { content, user, register, login } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

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

  return (
    <>
      { content === "login" &&
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
            <Grid className={classes.linkContainer}>
              <Link href="#" className={classes.forgotPassword}>Forgot?</Link>
            </Grid>
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
    }
    { content === "register" && 
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
    }
    </>
  )
}


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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrReg);