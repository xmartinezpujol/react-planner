import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';

import { COLOR_PALETTE } from '../../Constants';

import * as bookSlotActions from '../../redux/modules/Slots/book';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Text from '../../components/Text';

import BookSlotForm from './BookSlotForm';

class BookingTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.handleBooking = this.handleBooking.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleBooking(values) {
    this.props.dispatch(bookSlotActions.bookSlot(
      this.props.slot.Start,
      this.props.slot.End,
      this.props.currWeek,
      {
        Name: values.userName,
        SecondName: values.userSurname,
        Email: values.userEmail,
        Phone: values.userPhone,
      },
      values.userComments,
    ));
    this.closeModal();
  }

  openModal() {
    this.setState(() => ({
      modal: true,
    }));
  }

  closeModal() {
    this.setState(() => ({
      modal: false,
    }));
  }

  render() {
    const { slot } = this.props;
    const { modal } = this.state;
    return (
      <React.Fragment>
        <Button
          disabled={slot.Taken}
          size="small"
          template="link"
          onClick={() => this.openModal()}
        >
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
        {modal &&
          <Modal
            padding={20}
            color="#FAFAFA"
            onModalClose={() => this.closeModal('offerAssign')}
          >
            <Text type="h2" style={{ marginTop: 0 }}>
              Visit details
            </Text>
            <Text type="p1">
              Please fill in your information for the visit.
            </Text>
            <BookSlotForm slot={slot} onSubmit={this.handleBooking} />
          </Modal>
        }
      </React.Fragment>
    );
  }
}

export default connect()(BookingTime);
