import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "../../../../utils/FormControls/FormControls";

let UpdateProfileForm = (props) => {
  debugger;
  return (
    <>
    <form onSubmit={props.handleSubmit}>
      {props.error && <div>{props.error}</div>}
      <div>
        <b>О себе: </b>
        <Field name="aboutMe" component='input' value={props.initialValues.aboutMe} />
      </div>
      <div>
        <b>Имя: </b>
        <Field name="fullName" component='input' />
      </div>
      <div>
        <b>Поиск работы: </b>
        <Field name="lookingForAJob" component='input' type="checkbox" />
      </div>
      <div>
        <b>Профессиональные умения: </b>
        <Field name="lookingForAJobDescription" component='input' />
      </div>
      <div>
        <b>Контакты: </b>
        <div>
        {Object.keys(props.profile.contacts).map(contact => {
        return <div><b>{contact}: </b><Field key={contact} name={"contacts." + contact} component='input' /></div>
        })}
        </div>
      </div>
      <div>
        <button>Сохранить</button>
      </div>
    </form>
    <button onClick={props.cancelUpdate}>
      Отмена
    </button>
    </>
  );
};

UpdateProfileForm = reduxForm({
  form: "update-profile",
  enableReinitialize: true, destroyOnUnmount: false,
})(UpdateProfileForm);

export default UpdateProfileForm;
