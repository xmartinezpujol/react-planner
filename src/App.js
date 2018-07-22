import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import ForgotPwd from './containers/ForgotPwd';
import Login from './containers/Login';
import WeekPlanner from './containers/WeekPlanner';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { status } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/planner/week"
            component={WeekPlanner}
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/forgot"
            component={ForgotPwd}
          />
          {status.isLogged &&
            <Redirect to="/planner/week" />
          }
          {!status.isLogged &&
            <Redirect to="/login" />
          }
        </Switch>
        <div id="modal" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.credentials,
  status: state.status,
});

export default withRouter(connect(mapStateToProps)(App));
