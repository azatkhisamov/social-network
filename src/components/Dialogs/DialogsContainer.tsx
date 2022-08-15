import React from "react";
import {
  actions, DialogsDataType, MessagesDataType,
} from "../../redux/dialogsReducer";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
// import Dialogs from "./Dialogs";
import DialogsForm from "./DialogsForm";
import { connect } from "react-redux";
import withAuthRedirectComponent from "../../hoc/withAuthRedirectComponent";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
  dialogsData: Array<DialogsDataType>
  messagesData: Array<MessagesDataType>
};
type MapDispatchToPropsType = {
  sendMessage: (message: string) => void
};
type OwnPropsType = {};
type HOCPropsType = {
  isAuth: boolean
};
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const Dialogs: React.FC<PropsType> = (props: PropsType) => {

  // const onSubmit = (formData) => {
  //   props.sendMessage(formData.message)
  //   formData.message = ''
  // }

  return (
    <>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {props.dialogsData.map((item) => (
            <DialogItem
              key={item.id}
              name={item.name}
              urlId={item.id}
              imgUrl={item.imgUrl}
            />
          ))}
        </div>
        <div className={s.messages}>
          {props.messagesData.map((item) => (
            <Message key={item.id} message={item.message} writer={item.writer} />
          ))}
        </div>
      </div>
      <DialogsForm sendMessage={props.sendMessage} />
    </>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData
  };
};

export default compose<React.ComponentType>(
  withAuthRedirectComponent,
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    sendMessage: actions.sendMessage
  }),
)(Dialogs);

