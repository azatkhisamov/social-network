import React from "react";
import {
  sendMessageActionCreator,
  updateMessageActionCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux/es/exports";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => dispatch(sendMessageActionCreator()),
    updateMessage: (targetValue) =>
      dispatch(updateMessageActionCreator(targetValue)),
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
