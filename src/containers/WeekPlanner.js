import React from 'react';
import glamorous from 'glamorous';
import moment from 'moment';

import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { COLOR_PALETTE } from '../Constants';

import WeekTable from './WeekTable';

import Text from '../components/Text';
import View from '../components/View';

const Title = glamorous(View)({
  marginBottom: 20,
});

class WeekPlanner extends React.Component {
  constructor(props) {
    super(props);
    const match = matchPath(this.props.history.location.pathname, {
      path: '/planner/week/:id',
      exact: true,
      strict: false,
    });
    const { id } = match.params;
    this.state = {
      id,
    };
  }

  render() {
    const { id } = this.state;
    return (
      <View
        container
        justify="center"
        align="center"
        direction="column"
        style={{ margin: '100px auto' }}
      >
        <Title>
          <Text type="span" style={{ fontSize: 24, fontWeight: 500 }}>
            Week of
          </Text>
          <Text
            type="span"
            style={{
              color: COLOR_PALETTE.green,
              fontSize: 24,
              fontWeight: 500,
              padding: '0 10px',
            }}
          >
            {moment(id).startOf('week').format('DD-MM')}
          </Text>
          <Text type="span" style={{ fontSize: 24, fontWeight: 500 }}>
            to
          </Text>
          <Text
            type="span"
            style={{
              color: COLOR_PALETTE.green,
              fontSize: 24,
              fontWeight: 500,
              padding: '0 10px',
            }}
          >
            {moment(id).endOf('week').format('DD-MM')}
          </Text>
        </Title>
        <WeekTable time={id} />
      </View>
    );
  }
}

export default withRouter(WeekPlanner);
