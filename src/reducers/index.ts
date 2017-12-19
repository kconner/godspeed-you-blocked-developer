import { Action } from '../actions';
import { StoreState } from '../types/index';
import { SET_CURRENT_PLAN_ID } from '../constants/index';

export default (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case SET_CURRENT_PLAN_ID:
      return { ...state, currentPlanID: action.planID };
    default:
      return state;
  }
};
