import { Field, ErrorMessage, FieldAttributes } from "formik";

interface MyTextInputProps extends FieldAttributes<any> {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ label, ...props }) => (
  <div className="form-group">
    <label htmlFor={props.name}>{label}</label>
    <Field
      className="form-control"
      {...props}
      autoComplete="off"
    />
    <ErrorMessage name={props.name} component="div" className="error" />
  </div>
);

export default MyTextInput;
