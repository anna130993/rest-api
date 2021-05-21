import { connect } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { getSeats, loadSeatsRequest, loadSeats } from '../../../redux/seatsRedux';
import Lineup from './Lineup';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
  request: getRequest(state),
  seats: getSeats(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcerts: () => dispatch(loadConcertsRequest()),
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: seats => dispatch(loadSeats(seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lineup);