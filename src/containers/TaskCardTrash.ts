import TaskCardTrash from '../components/TaskCardTrash';
import * as actions from '../actions/index';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
  removeTask: (taskID: string) => {
    dispatch(actions.removeTask(taskID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCardTrash);
