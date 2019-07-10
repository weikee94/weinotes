import {
  CHANGE_INPUT_VALUE,
  SUBMIT_INPUT_VALUE,
  DELETE_INPUT_VALUE,
  INIT_INPUT
} from "./actionTypes";
import axios from "axios";

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

export const initListAction = data => ({
  type: INIT_INPUT,
  data
});

export const getTodoList = () => {
  return dispatch => {
    axios
      .get("https://testapi.io/api/weikee94/list.json")
      .then(res => {
        const data = res.data;
        const action = initListAction(data);
        dispatch(action);
      })
      .catch(() => {});
  };
};
