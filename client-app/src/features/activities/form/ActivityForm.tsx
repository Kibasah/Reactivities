import React, { useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

import { useStore } from "../../../App/stores/store";
import { Activity } from "../../../App/models/activity";
import LoadingComponent from "../../../App/layout/LoadingComponent";

const ActivityForm: React.FC = observer(() => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    date: Yup.string().required("Date is required"),
    category: Yup.string().required("Agensi is required"),
    city: Yup.string().required("Isu is required"),
    venue: Yup.string().required("Penyelesaian is required"),
    description: Yup.string().required("Catatan is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!values.id) {
        values.id = uuid();
        await createActivity(values);
        navigate(`/activities/${values.id}`);
      } else {
        await updateActivity(values);
        navigate(`/activities/${values.id}`);
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    dirty,
  } = formik;

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        if (activity) {
          formik.setValues(activity);
        }
      });
    }
  }, [id, loadActivity, formik]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Tajuk"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && !!errors.title}
        />
        {touched.title && errors.title && (
          <div className="ui pointing below prompt label">{errors.title}</div>
        )}

        <Form.TextArea
          placeholder="Catatan"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && !!errors.description}
        />
        {touched.description && errors.description && (
          <div className="ui pointing below prompt label">{errors.description}</div>
        )}

        <Form.Input
          placeholder="Agensi"
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.category && !!errors.category}
        />
        {touched.category && errors.category && (
          <div className="ui pointing below prompt label">{errors.category}</div>
        )}

        <Form.Input
          type="date"
          placeholder="Tarikh"
          name="date"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.date && !!errors.date}
        />
        {touched.date && errors.date && (
          <div className="ui pointing below prompt label">{errors.date}</div>
        )}

        <Form.Input
          placeholder="Isu"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.city && !!errors.city}
        />
        {touched.city && errors.city && (
          <div className="ui pointing below prompt label">{errors.city}</div>
        )}

        <Form.Input
          placeholder="Penyelesaian"
          name="venue"
          value={values.venue}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.venue && !!errors.venue}
        />
        {touched.venue && errors.venue && (
          <div className="ui pointing below prompt label">{errors.venue}</div>
        )}

        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Hantar"
          disabled={!isValid || isSubmitting || !dirty}
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Batal"
        />
      </Form>
    </Segment>
  );
});

export default ActivityForm;
