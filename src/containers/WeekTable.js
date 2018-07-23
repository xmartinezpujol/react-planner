import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';
import moment from 'moment/moment';
import uniqid from 'uniqid';

import { connect } from 'react-redux';

import Loader from '../components/Loader';
import Table from '../components/Table';
import Text from '../components/Text';
import View from '../components/View';

import * as weeklySlotsAction from '../redux/modules/Slots/weekly';
import {
  getWeeklySlotsByDay,
} from '../redux/modules/selectors';

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const fadeIn = glamor.css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const Cell = glamorous(View)({
  width: '100%',
  minHeight: '100%',
  borderRight: '1px solid white',
});

const TableContainer = glamorous(View)({
  maxWidth: '100%',
  overflow: 'auto',
  transition: 'all 0.6s ease',
  animation: `${fadeIn} 1s ease`,
  '@media(min-width: 768px)': {
    width: 720,
  },
  '@media(min-width: 992px)': {
    width: 920,
  },
  '@media(min-width: 1200px)': {
    width: 1430,
    justifyContent: 'center',
  },
});

const Error = glamorous(View)({
  padding: 40,
  marginTop: 50,
});

const FullWidthWrapper = glamorous.div({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  display: 'flex',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
});

class WeekTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.updateTime(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.time !== this.props.time) {
      this.updateTime(newProps);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(weeklySlotsAction.resetSlotsWeekly());
  }

  updateTime(props) {
    // Failsafe
    if (moment(props.time).weekday() !== 0) {
      this.setState(() => ({
        isValid: false,
      }));
      return;
    }

    // Reset first so we see a loading time
    props.dispatch(weeklySlotsAction.resetSlotsWeekly());

    props.dispatch(weeklySlotsAction.fetchSlotsWeekly(
      props.time,
      __API_AUTH_TOKEN__,
    ));
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
                      <Text key={uniqid()} type="p1" style={{ margin: 6 }}>
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
          <FullWidthWrapper>
            <Loader color="green" />
          </FullWidthWrapper>
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
