import React from 'react';
import glamorous from 'glamorous';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import View from '../components/View';

import Logo from '../components/Logo';


storiesOf('Login', module)
  .add('default', () => {
    return (
      <Login />
    );
  })
  .add('loading', () => (
    <Login initialState={{ isLoading: true }} />
  ))
  .add('error', () => (
    <Login initialState={{ isError: true }} />
  ));


const LoginContainer = glamorous(View)({
  width: '100vw',
  height: '100vh',
});

const InputLoginStyles = {
  width: '100%',
};

const LoginForm = glamorous(View)({
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

const ForgottenPwd = glamorous(Button)({
  fontSize: 16,
  margin: 0,
});

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      isError: false,
      ...props.initialState,
    };
    this.handleRequests = this.handleRequests.bind(this);
  }

  handleRequests() {
    this.setState(() => ({
      isLoading: true,
    }));

    setTimeout(() => (
      this.setState(() => ({
        isLoading: false,
      }))
    ), 1000);
  }

  render() {
    const { isLoading, isError } = this.state;
    return (
      <LoginContainer
        direction="column"
        justify="center"
        align="center"
        type="spacewhite"
      >
        <Logo />
        <Text type="p1" style={{ fontSize: 20, marginTop: 55 }}>
          Sign in to your account
        </Text>
        <LoginForm align="center" justify="center" direction="column">
          <Input
            type="text"
            placeholder="Email"
            required
            style={{ marginBottom: 15, marginTop: 15 }}
            outerStyle={InputLoginStyles}
            borderFocus="blue"
          />
          <Input
            type="password"
            placeholder="Password"
            togglePassword
            required
            outerStyle={InputLoginStyles}
            borderFocus="blue"
            loading={isLoading}
          />
          {isError &&
            <Text type="p1" style={{ color: 'red' }}>
              Invalid credentials.
            </Text>
          }
          <Submit bold onClick={this.handleRequests}>
            Sign in
          </Submit>
          <ForgottenPwd
            bordercolor="blue"
            template="link"
          >
            Forgot your password?
          </ForgottenPwd>
        </LoginForm>
      </LoginContainer>
    );
  }
}

export default Login;
