import * as constants from '../constants';

export interface SetGroup {
  type: constants.SET_GROUP;
  group: string;
}

export interface IncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
}

export type Action = SetGroup | IncrementEnthusiasm | DecrementEnthusiasm;

export const setGroup = (group: string): SetGroup => ({
  type: constants.SET_GROUP,
  group
});

export const incrementEnthusiasm = (): IncrementEnthusiasm => ({
  type: constants.INCREMENT_ENTHUSIASM
});

export const decrementEnthusiasm = (): DecrementEnthusiasm => ({
  type: constants.DECREMENT_ENTHUSIASM
});
