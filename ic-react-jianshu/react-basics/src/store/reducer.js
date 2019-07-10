import {
  CHANGE_INPUT_VALUE,
  SUBMIT_INPUT_VALUE,
  DELETE_INPUT_VALUE,
  INIT_INPUT
} from "./actionTypes";

const defaultState = {
  inputValue: "",
  list: []
};

// reducer 可以接受state, 不能修改state, 所以必须deep clone then only edit state

export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === SUBMIT_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    console.log("Submit new value: ", newState);
    newState.list.push(newState.inputValue);
    newState.inputValue = "";
    return newState;
  }
  if (action.type === DELETE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  if (action.type === INIT_INPUT) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data.split(",");
    return newState;
  }
  return state;
};
