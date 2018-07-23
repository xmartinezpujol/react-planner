import React from 'react';
import uniqid from 'uniqid';
import glamorous from 'glamorous';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

import { withKnobs, select } from '@storybook/addon-knobs';

import Slots from '../mocks/Slots';

import Table from '../components/Table';
import Text from '../components/Text';
import View from '../components/View';

const optionsColor = {
  purewhite: 'purewhite',
  spacewhite: 'spacewhite',
  night: 'night',
  green: 'green',
  red: 'red',
  red_light: 'red_light',
  blue: 'blue',
  blue_light: 'blue_light',
  text: 'text',
  text2: 'text2',
  title: 'title',
};

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const freeSlots = Slots.filter(slot => slot.Taken !== true);

const weeklySlots = {
  Monday: freeSlots.slice(0, 10),
  Tuesday: freeSlots.slice(11, 20),
  Wednesday: freeSlots.slice(21, 30),
  Thursday: freeSlots.slice(31, 40),
  Friday: freeSlots.slice(41, 48),
  Saturday: freeSlots.slice(49, 55),
  Sunday: freeSlots.slice(56, 60),
};

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('dynamic', () => {
    const defaultHeaderColor = 'green';
    const defaultCellColor = 'spacewhite';
    const headerColor = select('Header color', optionsColor, defaultHeaderColor);
    const cellColor = select('Cell color', optionsColor, defaultCellColor);
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
            headerColor={headerColor}
          >
            <Rows>
              {week.map(day => (
                <Cell
                  align="center"
                  key={uniqid()}
                  type={cellColor}
                  direction="column"
                >
                  {weeklySlots[day].map(item => (
                    <Text key={uniqid()} type="p1">
                      {moment(item.Start).format('HH:mm')}
                    </Text>
                  ))}
                </Cell>
              ))}
            </Rows>
          </Table>
        </TableContainer>
      </View>
    );
  });

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

const Rows = glamorous(View)({

});
