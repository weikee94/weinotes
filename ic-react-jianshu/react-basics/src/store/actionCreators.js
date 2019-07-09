import {
  CHANGE_INPUT_VALUE,
  SUBMIT_INPUT_VALUE,
  DELETE_INPUT_VALUE
} from "./actionTypes";

export const getInputChangeAction = value => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getInputSubmitAction = () => ({
  type: SUBMIT_INPUT_VALUE
});

export const getInputDeleteAction = index => ({
  type: DELETE_INPUT_VALUE,
  index
});
