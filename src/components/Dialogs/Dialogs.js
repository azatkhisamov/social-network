import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageActionCreator, updateMessageActionCreator } from "../../redux/dialogsReducer";

const Dialogs = (props) => {

  let sendMessage = () => {
    props.dispatch( sendMessageActionCreator() )
  }

  let updateMessage = (event) => {
    props.dispatch(updateMessageActionCreator(event.target.value))
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {props.state.dialogsData.map((item) => (
          <DialogItem
            key={item.id}
            name={item.name}
            urlId={item.id}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
      <div className={s.messages}>
        {props.state.messagesData.map((item) => (
          <Message key={item.id} message={item.message} writer={item.writer} />
        ))}
      </div>
      <div>
        <textarea value={props.state.newMessage} onChange={updateMessage}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default Dialogs;
