import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import ForgotPwd from './containers/ForgotPwd';
import Login from './containers/Login';
import WeekPlanner from './containers/WeekPlanner';

// Moment setup
moment.locale('es');
const thisMonday = moment().startOf('week').format('YYYYMMDD');

const App = props => (
  <React.Fragment>
    <Switch>
      <Route
        path="/login"
        component={Login}
      />
      {!props.status.isLogged &&
        <Redirect to="/login" />
      }
      <Route
        path="/planner/week/:id"
        component={WeekPlanner}
      />
      {props.status.isLogged &&
        <Redirect to={`/planner/week/${thisMonday}`} />
      }
      <Route
        path="/forgot"
        component={ForgotPwd}
      />
    </Switch>
    <div id="modal" />
  </React.Fragment>
);

const mapStateToProps = state => ({
  credentials: state.credentials,
  status: state.status,
});

export default withRouter(connect(mapStateToProps)(App));
