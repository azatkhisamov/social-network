import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";

let DialogsForm = (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            name={'message'}
            component={'textarea'}
            placeholder={'Введите сообщение'}
          />
        </div>
        <div>
          <button>Отправить</button>
        </div>
      </form>
  )
}

DialogsForm = reduxForm({
  form: 'dialog'
})(DialogsForm);


const Dialogs = (props) => {

  const onSubmit = (formData) => {
    props.sendMessage(formData.message)
    formData.message = ''
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
      <DialogsForm onSubmit={onSubmit}/>
    </div>
  );
};



export default Dialogs;
