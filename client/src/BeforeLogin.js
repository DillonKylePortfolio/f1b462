import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import backgroundImage from './assets/bg-img.png';
import bubble from './assets/bubble.svg';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#FFF",
    height: "100vh"
  },
  gridContainer: {
    height: "100%"
  },
  imageContainer: {
    overflow: "hidden",
    position: "relative"
  },
  // Hides bottom of sidebar image
  imageStretch: {
    backgroundColor: "#98C1F9",
    width: "100%",
    height: "100%"
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    left: "0rem",
    top: "0rem",
    right: "0rem",
  },
  sidebarGradient: {
    position: "absolute",
    width: "100%",
    left: "0rem",
    top: "0rem",
    bottom: "0rem",
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    mixBlendMode: "normal",
    opacity: "0.85"
  },
  bubbleImage: {
    position: "absolute",
    width: "4.15rem",
    left: "calc(50% - 4.125rem/2)",
    right: "calc(50% - 4.125rem/2)",
    top: "calc(50% - 9.375rem)",
  },
  sidebarText: {
    position: "absolute",
    left: "15%",
    right: "15%",
    top: "calc(50% - 3.75rem)",
    textAlign: "center",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.625rem",
    lineHeight: "2.5rem",
    color: "#FFF",
  },
  inputSection: {
    
  }
})

function BeforeLogin(props) {
  const classes = useStyles();
  
  return <div className={classes.root}>
    <Grid container spacing={0} className={classes.gridContainer}>
      <Grid item xs={0} sm={6} md={5} className={classes.imageContainer}>
        <div className={classes.imageStretch}></div>
        <img src={backgroundImage} className={classes.bgImage} alt="background"/>
        <div className={classes.sidebarGradient}></div>
        <Grid container direction="column" className={classes.sidebarContent}>
          <Grid item>
            <img src={bubble} className={classes.bubbleImage} alt="message bubble"/>
          </Grid>
          <Grid item>
          <h1 className={classes.sidebarText}>
            Converse with anyone with any language
          </h1>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={7} className={classes.inputSection}>
        <props.inputs/>
      </Grid>
    </Grid>
  </div>;
}

export default BeforeLogin;
