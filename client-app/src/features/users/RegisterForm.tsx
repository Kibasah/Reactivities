import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../App/common/form";
import { Button, Header, Label, } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../App/stores/store";
import * as Yup from 'yup';

export default observer(function RegisterForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors, setSubmitting }) =>
        userStore.register(values)
          .catch(error => {
            setErrors({ error: 'Invalid email or password' });
            setSubmitting(false);
          })
      }

      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content = 'Daftar Pengguna' color = 'teal' textAlign = "center"/>
          <MyTextInput label="Emel" name='email' placeholder="Emel" />
          <MyTextInput label="Nama Pengguna" name='displayName' placeholder="Nama Pengguna" />
          <MyTextInput label="Username" name='username' placeholder="Username" />
          <MyTextInput label="Password" name='password' placeholder="Password" type='password' />
          
            <ErrorMessage
              name="error"
              render={() => (
                <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />
              )}
            />
          
          <Button disabled={!isValid || !dirty || isSubmitting} 
          loading={isSubmitting} positive content='Register' type="submit" fluid>Submit</Button>
        </Form>
      )}
    </Formik>
  );
});
