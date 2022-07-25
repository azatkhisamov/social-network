import React from "react";
import {
  sendMessageActionCreator,
  updateMessageActionCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux/es/exports";
import withAuthRedirectComponent from "../../hoc/withAuthRedirectComponent";
import { compose } from "redux";

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirectComponent
)(Dialogs);

