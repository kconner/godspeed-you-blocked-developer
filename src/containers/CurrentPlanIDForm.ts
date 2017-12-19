import TextField from '../components/TextField';
import * as actions from '../actions/index';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({ currentPlanID }: StoreState) => ({
  title: 'Plan',
  value: currentPlanID,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.SetCurrentPlanID>) => ({
  onChangeValue: (value: string) => dispatch(actions.setCurrentPlanID(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextField);
