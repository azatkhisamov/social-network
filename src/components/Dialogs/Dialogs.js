import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

  let sendMessage = () => {
    props.sendMessage()
  }

  let updateMessage = (event) => {
    let targetValue = event.target.value;
    props.updateMessage(targetValue)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {props.dialogsPage.dialogsData.map((item) => (
          <DialogItem
            key={item.id}
            name={item.name}
            urlId={item.id}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
      <div className={s.messages}>
        {props.dialogsPage.messagesData.map((item) => (
          <Message key={item.id} message={item.message} writer={item.writer} />
        ))}
      </div>
      <div>
        <textarea value={props.dialogsPage.newMessage} onChange={updateMessage}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default Dialogs;
