import React from "react";
import s from "./Dialogs.module.css";
// import { Field, reduxForm } from "redux-form";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Input } from 'antd';
import { Button, Stack } from "@mui/material";
import TextareaForm from "../../utils/Forms/TextareaForm";

type PropsType = {
  sendMessage: (message: string) => void
}

type DialogsFormValues = {
  message: string
}

const DialogsForm: React.FC<PropsType> = (props) => {

  const initialValues: DialogsFormValues = { message: '' };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        message: Yup.string().required('').max(5000, '')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        props.sendMessage(values.message);
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form>
        <Stack spacing={2} alignItems="baseline">
          <TextareaForm name='message' label='Новое сообщение' type='text' />
          <Button variant="contained" type="submit">Отправить</Button>
        </Stack>
        {/* <div>
          <Field name='message' as={Input} placeholder='Введите сообщение' autoSize={{ minRows: 3, maxRows: 5, }} />
          <ErrorMessage name='message' className={s.error} />
        </div>
        <div>
          <button type='submit'>Отправить</button>
        </div> */}
      </Form>
    </Formik>
  )
}

export default DialogsForm;

// let DialogsForm = (props) => {
//   return(
//     <form onSubmit={props.handleSubmit}>
//         <div>
//           <Field
//             name={'message'}
//             component={'textarea'}
//             placeholder={'Введите сообщение'}
//           />
//         </div>
//         <div>
//           <button>Отправить</button>
//         </div>
//       </form>
//   )
// }

// DialogsForm = reduxForm({
//   form: 'dialog'
// })(DialogsForm);


// const Dialogs = (props) => {

//   // const onSubmit = (formData) => {
//   //   props.sendMessage(formData.message)
//   //   formData.message = ''
//   // }

//   return (
//     <div className={s.dialogs}>
//       <div className={s.dialogsItems}>
//         {props.dialogsPage.dialogsData.map((item) => (
//           <DialogItem
//             key={item.id}
//             name={item.name}
//             urlId={item.id}
//             imgUrl={item.imgUrl}
//           />
//         ))}
//       </div>
//       <div className={s.messages}>
//         {props.dialogsPage.messagesData.map((item) => (
//           <Message key={item.id} message={item.message} writer={item.writer} />
//         ))}
//       </div>
//       <DialogsForm sendMessage={props.sendMessage}/>
//     </div>
//   );
// };



// export default Dialogs;
