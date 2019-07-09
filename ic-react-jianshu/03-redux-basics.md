### Redux

###### Redux 工作流程

- action creators dispatch action
- reducers based on action react
- store received data from reducers and pass to react component

###### Redux Store

- action (借什么书)
- store （图书管理员）
- reducer （记录本）
- react component （借书用户）

> store

```js
// store.js
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
```

> reducer

```js
// reducer.js
import {
  CHANGE_INPUT_VALUE,
  SUBMIT_INPUT_VALUE,
  DELETE_INPUT_VALUE
} from "./actionTypes";

const defaultState = {
  inputValue: "",
  list: []
};

// reducer 可以接受state, 不能修改state, 所以必须deep clone then only edit state, 纯函数给固定输入，固定输出而且不会有副作用
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
  return state;
};
```

> action

```js
// action.js
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
```

> constant

```js
export const CHANGE_INPUT_VALUE = "change_input_value";
export const SUBMIT_INPUT_VALUE = "submit_input_value";
export const DELETE_INPUT_VALUE = "delete_input_value";
```
