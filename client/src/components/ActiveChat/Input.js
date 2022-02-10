import React, { useState, useRef } from "react";
import { FormControl, FilledInput, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AttachFileIcon from '@material-ui/icons/AttachFile';

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
    padding: "0.5rem",
    borderRadius: "0.15rem",
    overflow: "hidden",
  },
  photoForm: {
    position: "absolute",
    top: "-8rem",
    right: "1rem",
  },
  sendButton: {
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
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

  const handleUpload = (e) => {
    e.preventDefault();
    if(imageUrlInput.current.files && imageUrlInput.current.files.length === 1) {
      const file = imageUrlInput.current.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "zm201ktq");
      const OPTIONS = {
        method: "POST",
        body: formData
      }
      fetch("https://api.cloudinary.com/v1_1/hatchypicturesticket/image/upload", OPTIONS)
      .then(response => response.json())
      .then(json => {
        setPhotoUrl(json);
      })  
    }
  };

  const setPhotoUrl = (response) => {
    photoUrls.current = [...photoUrls.current, response.secure_url];
    console.log(photoUrls.current);
  };

  return (
    <div className={classes.inputAnchor}>
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
      <div className={classes.attatchFileContainer}>
        <Button size="small" onClick={() => setModalOpen(previousState => !previousState)} className={classes.attachFileButton} arial-label="attach image button">
          <AttachFileIcon className={classes.paperClipIcon} alt="attach file icon"/>
        </Button>
        { modalOpen && (
          <form type="submit" onSubmit={(e) => handleUpload(e)} className={classes.photoForm}>
            <input ref={imageUrlInput} type="file" accept="image/png, image/jpg" className={classes.chooseFilesButton}/>
            <button className={classes.sendButton}>Upload</button>
          </form>
        )}
      </div>
    </div>
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
