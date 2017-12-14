import { Action } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, SET_GROUP } from '../constants/index';

export default (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case SET_GROUP:
      return { ...state, group: action.group };
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(0, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
};
