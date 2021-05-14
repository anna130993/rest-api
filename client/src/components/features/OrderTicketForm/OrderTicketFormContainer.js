import { connect } from 'react-redux';
import { addSeatRequest, getRequests } from '../../../redux/seatsRedux';
import { getDays, getRequest as daysRequests, loadDaysRequest } from '../../../redux/daysRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state),
  daysRequests: daysRequests(state),
  days: getDays(state),
});

const mapDispatchToProps = dispatch => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
  loadDays: () => dispatch(loadDaysRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);