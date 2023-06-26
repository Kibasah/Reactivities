import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../App/common/form";
import { Button, Header, Label, } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../App/stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors, setSubmitting }) =>
        userStore.login(values)
          .catch(error => {
            setErrors({ error: 'Invalid email or password' });
            setSubmitting(false);
          })
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content = 'Log Masuk Pengguna' color = 'teal' textAlign = "center"/>
          <MyTextInput label="Email" name='email' placeholder="Email" />
          <MyTextInput label="Password" name='password' placeholder="Password" type='password' />
          
            <ErrorMessage
              name="error"
              render={() => (
                <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />
              )}
            />
          
          <Button loading={isSubmitting} positive content='Login' type="submit" fluid>Submit</Button>
        </Form>
      )}
    </Formik>
  );
});
