import React from 'react';
import glamorous from 'glamorous';

import { Field, reduxForm } from 'redux-form';

import Button from './Button';
import Input from './Input';

const required = value => value
  ? undefined
  : 'Required';
const maxLength = max => value => value && value.length > max
  ? `Must be ${max} characters or less`
  : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value => value && value.length < min
  ? `Must be ${min} characters or more`
  : undefined;
const minLength5 = minLength(5);
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined;

const FormContainer = glamorous.form({
  width: '90%',
  '@media(min-width: 500px)': {
    width: 375,
  },
});

const Submit = glamorous(Button)({
  margin: '30px 0 5px 0',
  width: '100%',
  fontSize: 17,
  justifyContent: 'center',
});

const InputLoginStyles = {
  width: '100%',
  marginBottom: 15,
};

const Error = glamorous.div({
  color: 'red',
  textAlign: 'center',
  marginBottom: 15,
});

const renderEmail = ({ input, type, meta: { touched, error } }) => (
  <React.Fragment>
    <Input
      {...input}
      type={type}
      placeholder="Email"
      outerStyle={InputLoginStyles}
      style={{ marginTop: 15 }}
      borderFocus="blue"
    />
    {touched &&
    ((error && error !== 'Required' &&
      <Error>
        <span>
          {error}
        </span>
      </Error>
    )
    )}
  </React.Fragment>
);

const renderPassword = (
  {
    isLoading,
    input,
    type,
    meta: { touched, error },
  },
) => (
  <React.Fragment>
    <Input
      {...input}
      type={type}
      placeholder="Password"
      outerStyle={InputLoginStyles}
      borderFocus="blue"
      loading={isLoading}
      togglePassword
    />
    {touched &&
      ((error && error !== 'Required' &&
        <Error>
          <span>
            {error}
          </span>
        </Error>
      )
      )}
  </React.Fragment>
);


const LoginForm = (props) => {
  const {
    invalid,
    pristine,
    submitting,
    isLoading,
  } = props;
  return (
    <FormContainer onSubmit={props.handleSubmit}>
      <Field
        name="userEmail"
        type="email"
        component={renderEmail}
        validate={[email, required]}
      />
      <Field
        name="userPassword"
        type="password"
        required
        component={renderPassword}
        validate={[maxLength15, minLength5, required]}
        isLoading={isLoading}
      />
      <Submit bold disabled={invalid || pristine || submitting}>
        Sign in
      </Submit>
    </FormContainer>
  );
};

export default reduxForm({
  form: 'login',
})(LoginForm);
