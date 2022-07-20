import React from "react";
import { sendMessageActionCreator, updateMessageActionCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

  let sendMessage = () => {
    props.dispatch( sendMessageActionCreator() )
  }

  let updateMessage = (targetValue) => {
    props.dispatch(updateMessageActionCreator(targetValue))
  }

  return (<Dialogs sendMessage={sendMessage} updateMessage={updateMessage} state={props.state} />);
};

export default DialogsContainer;
