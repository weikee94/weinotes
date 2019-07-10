import { CHANGE_INPUT_VALUE, SUBMIT_INPUT_VALUE } from "./actionTypes";
import axios from "axios";

export const getInputChangeAction = value => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getInputSubmitAction = () => ({
  type: SUBMIT_INPUT_VALUE
});
