import React from 'react';
import glamorous from 'glamorous';

import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import View from '../components/View';

import Logo from '../components/Logo';

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
    this.state = {};
  }

  render() {
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
          />
          <Submit bold>
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
