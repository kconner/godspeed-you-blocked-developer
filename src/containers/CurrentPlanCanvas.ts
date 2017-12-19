import Canvas from '../components/Canvas';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

const mapStateToProps = ({ plans, currentPlanID }: StoreState) => ({
  plan: plans[currentPlanID],
});

export default connect(mapStateToProps)(Canvas);
