import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    textAlign: "left",
    width: "max-content",
    marginRight: "auto",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  },
  attachmentsBox: {
    display: "flex",
    flexWrap: "nowrap",
    height: "max-content",
  },
  imageThumbnail: {
    width: "100%",
  },
  paperContainer: {
    borderRadius: "1rem",
    marginBottom: "1rem",
  },
  attachmentsPaper: {
    width: "10rem",
    height: "10rem",
    overflow: "hidden",
    borderRadius: "1rem",
    marginRight: "auto",
  },
  attachmentsPaperSmall: {
    width: "7rem",
    height: "5rem",
    overflow: "hidden",
    borderRadius: "0.5rem",
    marginRight: "0.75rem",
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments } = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Grid className={classes.paperContainer}>
          { text !== "" && 
            <Box className={classes.bubble}>
              <Typography className={classes.text}>{text}</Typography>
            </Box>
          }
          { attachments && attachments.length === 1 && 
            <Box className={classes.attachmentsBox}>
              { attachments.map(photoUrl => {
                return (
                  <Paper variant="outlined" key={photoUrl} className={classes.attachmentsPaper}>
                    <img src={photoUrl} 
                    className={classes.imageThumbnail} 
                    alt="thumbnail of sent"
                    aria-label="thumbnail of sent"/>
                  </Paper>
                )
              })}
            </Box>
          }
          { attachments && attachments.length > 1 && 
          <Box className={classes.attachmentsBox}>
            { attachments.map(photoUrl => {
              return (
                <Paper variant="outlined" key={photoUrl} className={classes.attachmentsPaperSmall}>
                  <img src={photoUrl} 
                  className={classes.imageThumbnail} 
                  alt="thumbnail of sent"
                  aria-label="thumbnail of sent"/>
                </Paper>
              )
            })}
          </Box>
        }
        </Grid>

      </Box>
    </Box>
  );
};

export default OtherUserBubble;
