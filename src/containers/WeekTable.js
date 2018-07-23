import React from 'react';
import glamorous from 'glamorous';
import moment from 'moment/moment';
import uniqid from 'uniqid';

import Table from '../components/Table';
import Text from '../components/Text';
import View from '../components/View';

import Slots from '../mocks/Slots';

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const freeSlots = Slots.filter(slot => slot.Taken !== true);

const weeklySlots = [
  freeSlots.slice(0, 1),
  freeSlots.slice(2, 3),
  freeSlots.slice(4, 5),
  freeSlots.slice(6, 7),
  freeSlots.slice(8, 9),
  freeSlots.slice(10, 11),
  freeSlots.slice(12, 13),
];

const Cell = glamorous(View)({
  width: '100%',
});

const TableContainer = glamorous(View)({
  maxWidth: '100%',
  overflow: 'auto',
  '@media(min-width: 768px)': {
    width: 720,
  },
  '@media(min-width: 992px)': {
    width: 920,
  },
  '@media(min-width: 1200px)': {
    maxWidth: 1430,
  },
});

class WeekTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        container
        direction="column"
        align="center"
        justify="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <TableContainer>
          <Table
            dataColumns={week}
            headerColor="green"
          >
            {week.map((day, index) => (
              <Cell
                justify="center"
                align="center"
                key={uniqid()}
                type="spacewhite"
              >
                {weeklySlots[index].map(item => (
                  <Text key={uniqid()} type="p1">
                    {moment(item.Start).format('HH:mm')}
                  </Text>
                ))}
              </Cell>
            ))}
          </Table>
        </TableContainer>
      </View>
    );
  }
}

export default WeekTable;