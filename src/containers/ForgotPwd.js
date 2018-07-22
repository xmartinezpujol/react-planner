import React from 'react';
import glamorous from 'glamorous';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { COLOR_PALETTE } from '../Constants';

import View from '../components/View';
import Text from '../components/Text';

import * as statusAction from '../redux/modules/Global/status';

const GoBack = glamorous(Link)({
  fontSize: 16,
  marginTop: 20,
  textDecoration: 'none',
  color: COLOR_PALETTE.blue,
});

class ForgotPwd extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Force logout as we don't have a /logout route
    this.props.dispatch(statusAction.setLoginStatus(false));
  }

  render() {
    return (
      <View
        container
        justify="center"
        align="center"
        height="100vh"
        direction="column"
      >
        <Text type="p1">
          Here goes forgotten password form. This is just a placeholder.
        </Text>
        <Text type="p1">
          Left it blank to see if routing is working only :)
        </Text>
        <GoBack to="/">
          Go Back
        </GoBack>
      </View>
    );
  }

}

const mapStateToProps = state => ({
  status: state.status,
});

export default withRouter(connect(mapStateToProps)(ForgotPwd));
