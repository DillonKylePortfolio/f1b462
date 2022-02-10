import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
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
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <div className={classes.paperContainer}>
        { attachments && attachments.length > 0 && 
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
        { text !== "" && 
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
      </div>
    </Box>
  );
};

export default SenderBubble;
