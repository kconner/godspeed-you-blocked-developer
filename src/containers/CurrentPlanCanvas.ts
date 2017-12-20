import Canvas from '../components/Canvas';
import * as actions from '../actions/index';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({ plans, currentPlanID }: StoreState) => ({
  plan: plans[currentPlanID],
});

const mapDispatchToProps = (dispatch: Dispatch<actions.SetCurrentPlanID>) => ({
  onChangeTaskTitle: (taskID: string, value: string) => dispatch(actions.setTaskTitle(taskID, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
