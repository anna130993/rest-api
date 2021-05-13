import { connect } from 'react-redux';
import { addSeatRequest, getRequests } from '../../../redux/seatsRedux';
import {getDays, getRequests as daysRequests, loadDaysRequests} from '../../../redux/daysRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state),
  daysRequests: daysRequests(state),
  days: getDays(state),
});

const mapDispatchToProps = dispatch => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
  loadDays: () => dispatch(loadDaysRequests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);