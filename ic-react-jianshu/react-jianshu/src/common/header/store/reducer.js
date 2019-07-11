import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  focused: false,
  list: []
});

export default (state = defaultState, action) => {
  if (action.type === constants.SEARCH_FOCUS) {
    // immutable 对象的set方法会结合之前immutable对象的值和设置的值
    // 返回一个全新对象
    return state.set("focused", true);
    // 下面这个方法是直接修改之前对象的state
    // return {
    //   focused: true
    // };
  }
  if (action.type === constants.SEARCH_BLUR) {
    return state.set("focused", false);
    // return {
    //   focused: false
    // };
  }
  if (action.type === constants.CHANGE_LIST) {
    return state.set("list", action.data);
    // return {
    //   focused: false
    // };
  }

  return state;
};
