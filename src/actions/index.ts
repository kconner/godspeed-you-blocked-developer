import * as constants from '../constants';
import { Point } from '../types';

export interface SetCurrentPlanID {
  type: constants.SET_CURRENT_PLAN_ID;
  planID: string;
}

export interface AddTask {
  type: constants.ADD_TASK;
  location: Point;
}

export interface RemoveTask {
  type: constants.REMOVE_TASK;
  taskID: string;
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

export interface SetTaskLocation {
  type: constants.SET_TASK_LOCATION;
  taskID: string;
  location: Point;
}

export interface SetTaskDone {
  type: constants.SET_TASK_DONE;
  taskID: string;
  isDone: boolean;
}

export interface AddPrerequisiteTask {
  type: constants.ADD_PREREQUISITE_TASK;
  prerequisiteTaskID: string;
  taskID: string;
}

export interface RemovePrerequisiteTask {
  type: constants.REMOVE_PREREQUISITE_TASK;
  prerequisiteTaskID: string;
  taskID: string;
}

export type Action =
  SetCurrentPlanID
  | AddTask
  | RemoveTask
  | SetTaskTitle
  | SetTaskAssignee
  | SetTaskLocation
  | SetTaskDone
  | AddPrerequisiteTask
  | RemovePrerequisiteTask;

export const setCurrentPlanID = (planID: string): SetCurrentPlanID => ({
  type: constants.SET_CURRENT_PLAN_ID,
  planID
});

export const addTask = (location: Point): AddTask => ({
  type: constants.ADD_TASK,
  location
});

export const removeTask = (taskID: string): RemoveTask => ({
  type: constants.REMOVE_TASK,
  taskID
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

export const setTaskLocation = (taskID: string, location: Point): SetTaskLocation => ({
  type: constants.SET_TASK_LOCATION,
  taskID,
  location
});

export const setTaskDone = (taskID: string, isDone: boolean): SetTaskDone => ({
  type: constants.SET_TASK_DONE,
  taskID,
  isDone
});

export const addPrerequisiteTask = (prerequisiteTaskID: string, taskID: string): AddPrerequisiteTask => ({
  type: constants.ADD_PREREQUISITE_TASK,
  prerequisiteTaskID,
  taskID,
});

export const removePrerequisiteTask = (prerequisiteTaskID: string, taskID: string): RemovePrerequisiteTask => ({
  type: constants.REMOVE_PREREQUISITE_TASK,
  prerequisiteTaskID,
  taskID,
});
