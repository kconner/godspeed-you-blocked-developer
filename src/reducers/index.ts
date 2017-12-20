import { Action } from '../actions';
import { StoreState } from '../types/index';
import { SET_CURRENT_PLAN_ID, SET_TASK_TITLE } from '../constants/index';

export default (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case SET_CURRENT_PLAN_ID:
      return { ...state, currentPlanID: action.planID };
    case SET_TASK_TITLE:
      // TODO: Is there a way I make this update code simpler?
      // Maybe study the WT website's reducers for better patterns
      const { currentPlanID: planID, plans } = state;
      const { taskID, title } = action;
      const plan = plans[planID];
      if (!plan) {
        return state;
      }

      const { tasks } = plan;
      const task = tasks[taskID];
      if (!task) {
        return state;
      }

      return {
        ...state,
        plans: {
          ...plans,
          [planID]: {
            ...plan,
            tasks: {
              ...plan.tasks,
              [taskID]: {
                ...task,
                title
              }
            }
          }
        }
      }
    default:
      return state;
  }
};
