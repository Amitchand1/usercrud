import React from 'react';
import { Formik, Form, Field } from 'formik';
import './register.css';
import * as yup from 'yup';
// import { TextField } from '@material-ui/core';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/ContextApi';
import { useHistory } from 'react-router-dom';

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Too short !')
    .max(20, 'Too long !')
    .required(),
  lastName: yup.string().min(2, 'Too short !').max(20, 'Too long !').required(),
  email: yup.string().email('Invalid Email !').required(),
  age: yup.number().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required(),
});
function Register() {
  const { addUser } = useAuthContext();
  const history = useHistory();
  return (
    <div>
      <div className="form-register">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signupSchema}
          onSubmit={(data) => {
            const id = Math.random() * 100;
            const userToAdd = {
              id,
              ...data,
            };
            addUser(userToAdd);
            history.push('/');
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="form-group">
                <h1>SignUp</h1>
                <Field
                  name="firstName"
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  label="firstName"
                  as={TextField}
                  className="fields"
                  style={{ marginBottom: '1em' }}
                />

                <Field
                  name="lastName"
                  type="input"
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  label="lastName"
                  as={TextField}
                  className="fields"
                  style={{ marginBottom: '1em' }}
                />

                <Field
                  name="age"
                  type="number"
                  error={touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                  label="age"
                  as={TextField}
                  className="fields"
                  style={{ marginBottom: '1em' }}
                />
                <Field
                  name="email"
                  type="email"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  label="email"
                  as={TextField}
                  className="fields"
                  style={{ marginBottom: '1em' }}
                />
                <Field
                  name="password"
                  type="password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  label="password"
                  as={TextField}
                  className="fields"
                  style={{ marginBottom: '1em' }}
                />
                <Field
                  name="confirmPassword"
                  type="password"
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="confirmPassword"
                  as={TextField}
                  className="fields"
                />
                <button type="submit" className="btn-submit">
                  Submit
                </button>
                <Link to="/" className="links">
                  Already a Member? Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
