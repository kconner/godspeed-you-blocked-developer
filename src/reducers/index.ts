import { Action } from '../actions';
import { StoreState } from '../types/index';
import { SET_GROUP } from '../constants/index';

export default (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case SET_GROUP:
      return { ...state, group: action.group };
    default:
      return state;
  }
};
