import React from 'react';
import glamorous from 'glamorous';
import moment from 'moment/moment';
import uniqid from 'uniqid';

import { connect } from 'react-redux';

import Table from '../components/Table';
import Text from '../components/Text';
import View from '../components/View';

import * as weeklySlotsAction from '../redux/modules/Slots/weekly';
import {
  getWeeklySlotsByDay,
} from '../redux/modules/selectors';

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Cell = glamorous(View)({
  width: '100%',
  minHeight: '100%',
  borderRight: '1px solid white',
});

const TableContainer = glamorous(View)({
  maxWidth: '100%',
  '@media(min-width: 768px)': {
    width: 720,
    justifyContent: 'center',
  },
  '@media(min-width: 992px)': {
    width: 920,
  },
  '@media(min-width: 1200px)': {
    maxWidth: 1430,
  },
});

const Error = glamorous(View)({
  padding: 40,
  marginTop: 50,
});

class WeekTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
  }

  componentDidMount() {
    // Failsafe
    if (moment(this.props.time).weekday() !== 0) {
      this.setState(() => ({
        isValid: false,
      }));
      return;
    }

    this.props.dispatch(weeklySlotsAction.fetchSlotsWeekly(
      this.props.time,
      __API_AUTH_TOKEN__,
    ));
  }

  componentWillUnmount() {
    this.props.dispatch(weeklySlotsAction.resetSlotsWeekly());
  }

  render() {
    const { weeklySlotsByDay, weeklyslots } = this.props;
    const { isValid } = this.state;
    return (
      <React.Fragment>
        {!weeklyslots.isLoading && isValid &&
          <TableContainer>
            <Table
              dataColumns={week}
              headerColor="green"
            >
              <View>
                {week.map(day => (
                  <Cell
                    align="center"
                    key={uniqid()}
                    type="spacewhite"
                    direction="column"
                  >
                    {weeklySlotsByDay[day].map(item => (
                      <Text key={uniqid()} type="p1">
                        {moment(item.Start).format('HH:mm')}
                      </Text>
                    ))}
                  </Cell>
                ))}
              </View>
            </Table>
          </TableContainer>
        }
        {weeklyslots.isLoading && isValid &&
          <Text type="p1">
            Loading...
          </Text>
        }
        {!isValid &&
          <Error
            align="center"
            justify="center"
            type="red_light"
            round={20}
            direction="column"
          >
            <Text type="h2.w" style={{ marginTop: 0 }}>
              Invalid time!
            </Text>
            <Text type="p1.w" style={{ marginBottom: 0 }}>
              The time passed is not a valid Monday, we cant get this week for you :(
            </Text>
          </Error>
        }

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  weeklySlotsByDay: getWeeklySlotsByDay(state),
  weeklyslots: state.weeklyslots,
});

export default connect(mapStateToProps)(WeekTable);
