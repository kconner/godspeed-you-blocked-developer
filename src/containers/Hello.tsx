import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';

export const mapStateToProps = ({ enthusiasmLevel, languageName }: StoreState): object => ({
  enthusiasmLevel,
  name: languageName
});

export const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>): object => ({
  onIncrement: dispatch(actions.incrementEnthusiasm()),
  onDecrement: dispatch(actions.decrementEnthusiasm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
