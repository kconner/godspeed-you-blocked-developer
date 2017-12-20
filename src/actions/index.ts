import * as constants from '../constants';

export interface SetCurrentPlanID {
  type: constants.SET_CURRENT_PLAN_ID;
  planID: string;
}

export interface SetTaskTitle {
  type: constants.SET_TASK_TITLE;
  taskID: string;
  title: string;
}

export interface SetTaskAssignee {
  type: constants.SET_TASK_ASSIGNEE;
  taskID: string;
  assignee: string;
}

export type Action = SetCurrentPlanID | SetTaskTitle | SetTaskAssignee;

export const setCurrentPlanID = (planID: string): SetCurrentPlanID => ({
  type: constants.SET_CURRENT_PLAN_ID,
  planID
});

export const setTaskTitle = (taskID: string, title: string): SetTaskTitle => ({
  type: constants.SET_TASK_TITLE,
  taskID,
  title
});

export const setTaskAssignee = (taskID: string, assignee: string): SetTaskAssignee => ({
  type: constants.SET_TASK_ASSIGNEE,
  taskID,
  assignee
});
