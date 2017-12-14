import * as constants from '../constants';

export interface SetGroup {
  type: constants.SET_GROUP;
  group: string;
}

export type Action = SetGroup; // | OtherAction | OtherAction

export const setGroup = (group: string): SetGroup => ({
  type: constants.SET_GROUP,
  group
});
