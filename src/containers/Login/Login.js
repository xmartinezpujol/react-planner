import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { COLOR_PALETTE } from '../../Constants';

import LoginForm from '../../components/LoginForm';
import Logo from '../../components/Logo';
import Text from '../../components/Text';
import View from '../../components/View';

import * as credentialsActions from '../../redux/modules/Login/credentials';
import * as statusAction from '../../redux/modules/Global/status';


const fadeIn = glamor.css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeOut = glamor.css.keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const LoginContainer = glamorous(View)(
  {
    width: '100vw',
    height: '100vh',
    transition: 'all 0.6s ease',
    animation: `${fadeIn} 1s ease`,
  },
  props => ({
    animation: `${props.isAnimating} 1s ease`,
  }),
);

const ForgottenPwd = glamorous(Link)({
  fontSize: 16,
  marginTop: 20,
  textDecoration: 'none',
  color: COLOR_PALETTE.blue,
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAnimating: fadeIn,
    };
    this.handleRequests = this.handleRequests.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
  }

  componentDidMount() {
    // Force logout as we don't have a /logout route
    this.props.dispatch(statusAction.setLoginStatus(false));
  }

  stopAnimation() {
    this.setState(() => ({
      isAnimating: null,
    }));
  }

  handleRequests(values) {
    this.setState(() => ({
      isLoading: true,
    }));

    if (this.props.credentials.filter(user => (
      user.email === values.userEmail &&
      user.password === values.userPassword)).length > 0) {
      // User found, login
      setTimeout(() => (
        this.setState(() => ({
          isLoading: false,
          isAnimating: fadeOut,
        }))
      ), 500);
      setTimeout(() => {
        this.stopAnimation();
        // Redirect to Planner
        this.props.history.push(`/planner/${this.props.status.plannerMode}`);
      }, 1000);
      this.props.dispatch(statusAction.setLoginStatus(true));

    // User not found, register & login
    } else {
      this.props.dispatch(
        credentialsActions.createCredentials(
          values.userEmail,
          values.userPassword,
        ),
      );
      this.setState(() => ({
        isLoading: false,
        isAnimating: fadeOut,
      }));

      // Login
      setTimeout(() => {
        this.stopAnimation();
        // Redirect to Planner
        this.props.history.push(`/planner/${this.props.status.plannerMode}`);
      }, 1000);
      this.props.dispatch(statusAction.setLoginStatus(true));
    }
  }

  render() {
    const { isLoading, isAnimating } = this.state;
    return (
      <LoginContainer
        direction="column"
        justify="center"
        align="center"
        type="spacewhite"
        isAnimating={isAnimating}
      >
        <Logo />
        <Text type="p1" style={{ fontSize: 20, marginTop: 55 }}>
          Sign in to your account
        </Text>
        <LoginForm
          isLoading={isLoading}
          onSubmit={this.handleRequests}
        />
        <ForgottenPwd to="/forgot">
          Forgot your password?
        </ForgottenPwd>
      </LoginContainer>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.credentials,
  status: state.status,
});

export default withRouter(connect(mapStateToProps)(Login));
