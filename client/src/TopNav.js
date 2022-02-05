import React from 'react';
import { useHistory } from 'react-router-dom'

import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Hidden,
} from "@material-ui/core";

import { 
  topNav,
  whiteButton,
  whiteButtonSpacing,
  whiteButtonSpacingSmall,
  softText,
  softTextSpacing,
  softTextSpacingSmall,
  topCap,
} from './loginRegStyle';

const useStyles = makeStyles({
  topNav,
  whiteButton,
  whiteButtonSpacing,
  whiteButtonSpacingSmall,
  softText,
  softTextSpacing,
  softTextSpacingSmall,
  topCap,
});

function TopNav(props) {
  const classes = useStyles();
  const { whiteButtonText, softTextText, pushTo } = props;
  const history = useHistory();

  return <div>
      <Grid container item className={classes.topCap}>

        <Grid item xs={0} md={3} lg={5}></Grid>
        <Hidden mdUp>
          <Grid item xs={12} md={9} lg={7}>
            <nav className={classes.topNav}>
              <div className={classes.softTextSpacingSmall}>
                <Typography className={classes.softText}>{softTextText}</Typography>
              </div>
              <div className={classes.whiteButtonSpacingSmall}>
                <Button className={classes.whiteButton} onClick={() => history.push(`${pushTo}`)} aria-label={`Go to ${pushTo}`}>{whiteButtonText}</Button>
              </div>
            </nav>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={12} md={9} lg={7}>
            <nav className={classes.topNav}>
              <div className={classes.softTextSpacing}>
                <Typography className={classes.softText}>{softTextText}</Typography>
              </div>
              <div className={classes.whiteButtonSpacing}>
                <Button className={classes.whiteButton} onClick={() => history.push(`${pushTo}`)} aria-label={`Go to ${pushTo}`}>{whiteButtonText}</Button>
              </div>
            </nav>
          </Grid>
        </Hidden>

      </Grid>
  </div>;
}

export default TopNav;
