import React from 'react';
import glamorous from 'glamorous';

import { Field, reduxForm } from 'redux-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import View from '../../components/View';

const required = value => value
  ? undefined
  : 'Required';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined;
const phone = value => value && value.length !== 9 && !/^[679]{1}[0-9]{8}$/.test(value)
  ? 'Invalid phone number'
  : undefined;

const FormContainer = glamorous.form({
  width: '75vw',
  '@media(min-width: 500px)': {
    width: 500,
  },
});

const Submit = glamorous(Button)({
  margin: '30px 0 5px 0',
  width: '100%',
  fontSize: 17,
  justifyContent: 'center',
});

const InputBookSlotStyles = {
  width: '100%',
  marginBottom: 15,
};

const Error = glamorous.div({
  color: 'red',
  textAlign: 'center',
  marginBottom: 15,
});

const Name = glamorous(Input)({
  '@media(min-width: 500px)': {
    marginRight: 20,
  },
});

const FullName = glamorous(View)({
  flexDirection: 'column',
  '@media(min-width: 500px)': {
    flexDirection: 'row',
  },
});

const renderEmail = ({ input, type, meta: { touched, error } }) => (
  <React.Fragment>
    <Input
      {...input}
      type={type}
      placeholder="Email"
      outerStyle={InputBookSlotStyles}
      style={{ marginTop: 15 }}
      borderFocus="green"
    />
    {touched &&
    ((error && error !== 'Required' &&
      <Error>
        <span>
          {error}
        </span>
      </Error>
    ))}
  </React.Fragment>
);

const renderPhone = ({ input, type, meta: { touched, error } }) => (
  <React.Fragment>
    <Input
      {...input}
      type={type}
      placeholder="Phone number"
      outerStyle={InputBookSlotStyles}
      style={{ marginTop: 15 }}
      borderFocus="green"
    />
    {touched &&
    ((error && error !== 'Required' &&
      <Error>
        <span>
          {error}
        </span>
      </Error>
    ))}
  </React.Fragment>
);

const renderName = ({ input, type, meta: { touched, error } }) => (
  <React.Fragment>
    <Name
      {...input}
      type={type}
      placeholder="Name"
      outerStyle={InputBookSlotStyles}
      borderFocus="green"
    />
    {touched &&
    ((error && error !== 'Required' &&
      <Error>
        <span>
          {error}
        </span>
      </Error>
    ))}
  </React.Fragment>
);

const renderSurname = ({ input, type, meta: { touched, error } }) => (
  <React.Fragment>
    <Input
      {...input}
      type={type}
      placeholder="Surname"
      outerStyle={InputBookSlotStyles}
      borderFocus="green"
    />
    {touched &&
    ((error && error !== 'Required' &&
      <Error>
        <span>
          {error}
        </span>
      </Error>
    ))}
  </React.Fragment>
);

const BookSlotForm = (props) => {
  const {
    invalid,
    pristine,
    submitting,
  } = props;
  return (
    <FormContainer onSubmit={props.handleSubmit}>
      <FullName>
        <Field
          name="userName"
          type="text"
          required
          component={renderName}
          validate={required}
        />
        <Field
          name="userSurname"
          type="text"
          required
          component={renderSurname}
          validate={required}
        />
      </FullName>
      <Field
        name="userEmail"
        type="email"
        required
        component={renderEmail}
        validate={[email, required]}
      />
      <Field
        name="userPhone"
        type="tel"
        required
        validate={[phone, required]}
        component={renderPhone}
      />
      <Field
        name="userComments"
        style={{
          height: 100,
          maxWidth: 800,
          width: '100%',
          margin: 0,
          padding: '14px 20px',
          fontFamily: 'Lato, sans-serif',
          fontSize: 16,
          border: '2px solid #F4F4F4',
          marginTop: 15,
        }}
        placeholder="Describe your symptoms here..."
        component="textarea"
      />
      <Submit
        type="green"
        bold
        disabled={invalid || pristine || submitting}
      >
        Book
      </Submit>
    </FormContainer>
  );
};

export default reduxForm({
  form: 'bookSlot',
})(BookSlotForm);
