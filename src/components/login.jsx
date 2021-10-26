import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './login.css';
import * as yup from 'yup';
import { Alert, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid Email !').required(),
  password: yup.string().required(),
});
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    login: false,
    passError: false,
    error: false,
  });
  const history = useHistory();

  const handleSubmit = (e) => {
    console.log('form submitted');
    e.preventDefault();
    console.log(email, password);
    if (localStorage.getItem('register_user') !== null) {
      const users = JSON.parse(localStorage.getItem('register_user'));
      const findUser = users.filter((user) => user.email === email);
      if (findUser.length > 0) {
        if (findUser[0].password === password) {
          setUser((current) => {
            return { ...current, login: true, passError: false, error: false };
          });
          history.push('/dashboard');
        } else {
          setUser((current) => {
            return { ...current, login: false, passError: true, error: false };
          });
        }
      } else {
        setUser((current) => {
          return { ...current, login: false, passError: false, error: true };
        });
      }
    } else {
      console.log('no users found');
    }
  };
  return (
    <div>
      {user.login && <Alert severity="success">Login successful</Alert>}{' '}
      {user.passError && (
        <Alert severity="error">Incorrect Password. Please try again</Alert>
      )}
      {user.error && <Alert severity="error">Email does not exist</Alert>}
      <div className="form-login">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={signupSchema}
        >
          {({ errors, touched }) => (
            <Form className="inner-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <h1>Login</h1>
                <Field
                  name="email"
                  type="email"
                  // error={touched.email && !!errors.email}
                  // helperText={touched.email && errors.email}
                  label="email"
                  as={TextField}
                  className="fields"
                  style={{ marginBottom: '1.3em' }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <Field
                  name="password"
                  type="password"
                  // error={touched.password && !!errors.password}
                  // helperText={touched.password && errors.password}
                  label="password"
                  as={TextField}
                  className="fields"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />

                <button type="submit" className="btn-login">
                  Login
                </button>

                <Link to="/register" className="link">
                  Not a Member? Become One
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
