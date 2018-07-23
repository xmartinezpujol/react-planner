import React from 'react';
import moment from 'moment/moment';

import { COLOR_PALETTE } from '../Constants';

import Button from '../components/Button';
import Text from '../components/Text';

class BookingTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.handleBooking = this.handleBooking.bind(this);
  }

  handleBooking() {
    alert('do some booking!');
  }

  render() {
    const { slot } = this.props;
    return (
      <Button template="link" onClick={this.handleBooking}>
        <Text
          type="p1"
          style={{
            margin: 6,
            textDecoration: !slot.Taken ? 'underline' : 'line-through',
            color: COLOR_PALETTE.green,
          }}
        >
          {moment(slot.Start).format('HH:mm')}
        </Text>
      </Button>
    );
  }
}

export default BookingTime;
