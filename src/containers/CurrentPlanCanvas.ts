import Canvas from '../components/Canvas';
import * as actions from '../actions/index';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({ plans, currentPlanID }: StoreState) => ({
  plan: plans[currentPlanID],
});

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
  // Can I accomplish this with some partial appliation pattern?
  setTaskTitle: (taskID: string, value: string) => dispatch(actions.setTaskTitle(taskID, value)),
  setTaskAssignee: (taskID: string, value: string) => dispatch(actions.setTaskAssignee(taskID, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
