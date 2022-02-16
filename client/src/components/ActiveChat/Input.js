import React, { useState, useRef } from "react";
import { FormControl, FilledInput, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  inputAnchor: {
    position: "relative",
  },
  //image upload style
  attatchFileContainer: {
    position: "relative",
    textAlign: "right",
  },
  attachFileButton: {
    position: "relative",
    top: "-4.5rem",
    right: "1rem",
    backgroundColor: "#e8e8e8",
    border: "solid 1px #adadad",
  },
  paperClipIcon: {
    color: "#525252",
  },
  chooseFilesButton: {
    border: "solid 1px #adadad",
    backgroundColor: "rgba(255,255,255, 0.9)",
    padding: "1rem",
    borderRadius: "0.15rem",
    overflow: "hidden",

  },
  photoForm: {
    position: "absolute",
    top: "-8.5rem",
    right: "1rem",
  },
  sendButton: {
    position: "absolute",
    right: "0.5rem",
    top: "0.75rem"
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const imageUrlInput = useRef();
  const photoUrls = useRef([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if(photoUrls.current.length > 0 || text !== "") {
      const reqBody = {
        text: event.target.text.value,
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user,
        attachments: photoUrls.current,
      };
      await postMessage(reqBody);
      photoUrls.current = [];
      setText("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let files = imageUrlInput.current.files;
    let responseArray = [];
    if(imageUrlInput.current.files && files.length > 0) {
      const instance = axios.create();
      const data = new FormData();
      for(let i = 0; i < files.length; i++) {
        let file = files[i];
        data.append("file", file);
        data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
        const response = await instance.post('https://api.cloudinary.com/v1_1/hatchypicturesticket/image/upload', data);
        responseArray.push(response.data.secure_url);
      };

      console.log(responseArray);
      photoUrls.current = responseArray;
    }
  };

  return (
    <Grid className={classes.inputAnchor}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
        </FormControl>
      </form>
      <Grid className={classes.attatchFileContainer}>
        <Button size="small" onClick={() => setModalOpen(previousState => !previousState)} className={classes.attachFileButton} arial-label="attach image button">
          <AttachFileIcon className={classes.paperClipIcon} alt="attach file icon"/>
        </Button>
        { modalOpen && (
          <FormControl className={classes.photoForm}>
            <input type="file" ref={imageUrlInput} multiple accept="image/png, image/jpg" className={classes.chooseFilesButton} />
            <Button size="small" variant="contained" color="primary" className={classes.sendButton} onClick={(e) => handleUpload(e)}>Upload</Button>
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
