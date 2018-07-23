import React from 'react';
import glamorous from 'glamorous';
import moment from 'moment';

import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { COLOR_PALETTE } from '../Constants';

import WeekTable from './WeekTable';

import Button from '../components/Button';
import Text from '../components/Text';
import View from '../components/View';

const Navigator = glamorous(View)({
  marginBottom: 20,
});

const Title = glamorous(View)({
  padding: 0,
  '@media(min-width: 768px)': {
    padding: '0 20px',
  },
});

const NavLeft = glamorous.div({

});

const NavRight = glamorous.div({

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
        style={{ margin: '55px auto' }}
      >
        <Navigator align="center" justify="center">
          <NavLeft>
            <Button
              type="green"
              iFont="fa"
              iFontSize={22}
              icon="chevron-left"
              style={{ padding: 8 }}
            />
          </NavLeft>
          <Title>
            <Text type="span" style={{ fontSize: 18, fontWeight: 500 }}>
              Week of
            </Text>
            <Text
              type="span"
              style={{
                color: COLOR_PALETTE.green,
                fontSize: 18,
                fontWeight: 500,
                padding: '0 10px',
              }}
            >
              {moment(id).startOf('week').format('DD-MM')}
            </Text>
            <Text type="span" style={{ fontSize: 18, fontWeight: 500 }}>
              to
            </Text>
            <Text
              type="span"
              style={{
                color: COLOR_PALETTE.green,
                fontSize: 18,
                fontWeight: 500,
                paddingLeft: 10,
              }}
            >
              {moment(id).endOf('week').format('DD-MM')}
            </Text>
          </Title>
          <NavRight>
            <Button
              type="green"
              iFont="fa"
              iFontSize={22}
              icon="chevron-right"
              style={{ padding: 8 }}
            />
          </NavRight>
        </Navigator>
        <WeekTable time={id} />
      </View>
    );
  }
}

export default withRouter(WeekPlanner);
