import GroupTextField from '../components/GroupTextField';
import * as actions from '../actions/index';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export const mapStateToProps = ({ group }: StoreState) => ({
  group
});

export const mapDispatchToProps = (dispatch: Dispatch<actions.SetGroup>) => ({
  onChangeGroup: (group: string) => dispatch(actions.setGroup(group))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupTextField);
