import * as constants from "./constants";
import axios from "axios";
import { fromJS } from "immutable";

export const searchFocus = () => ({
  type: constants.SEARCH_FOCUS
});

// without redux thunk we only able return object
export const searchBlur = () => ({
  type: constants.SEARCH_BLUR
});

// 把data转换为immutable类型才会一样
const changeList = data => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data)
});

// with redux thunk we able to return a function instead of object
export const getList = () => {
  return dispatch => {
    axios
      .get("/api/headerList.json")
      .then(res => {
        const data = res.data;
        const action = changeList(data.data);
        dispatch(action);
      })
      .catch(() => {
        console.log("error");
      });
  };
};
