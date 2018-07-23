import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import View from './View';

const Header = glamorous(View)({
  padding: 20,
  fontSize: 14,
  color: 'white',
  width: '100%',
});

const Column = glamorous(View)({
  minWidth: '80vw',
  borderRight: '1px solid white',
  '@media(min-width: 500px)': {
    minWidth: 200,
  },
  '@media(min-width: 768px)': {
    minWidth: 150,
  },
});

const Table = props => (
  <View direction="column">
    <View>
      {props.dataColumns.map(headerText => (
        <Column
          justify="center"
          align="center"
          key={uniqid()}
          direction="column"
        >
          <Header
            justify="center"
            align="center"
            type={props.headerColor}
          >
            {headerText}
          </Header>
        </Column>
      ))}
    </View>
    {props.children}
  </View>
);

Table.propTypes = {
  dataColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerColor: PropTypes.string,
};

Table.defaultProps = {
  headerColor: 'green',
};

export default Table;
