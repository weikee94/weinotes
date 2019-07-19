### Redux Basic Usage

```js
import { createStore } from "redux";

// 创建Redux reducer
/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象,
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => console.log(store.getState()));

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1
```

### Reducer

> reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

> 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对 ES7 提案对象展开运算符的支持, 从而使用 { ...state,visibilityFilter: action.filter } 达到相同的目的。
> 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

```js
//reducer
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
}
```

### 创建异步 action

```js
export function onSearch(inputKey, token, popularKeys) {
  return dispatch => {
    dispatch({ type: Types.SEARCH_REFRESH });
    fetch(genFetchUrl(inputKey))
      .then(response => {
        //如果任务取消，则不做任何处理
        return checkCancel(token) ? response.json() : null;
      })
      .then(responseData => {
        if (!checkCancel(token, true)) {
          //如果任务取消，则不做任何处理
          return;
        }
        if (
          !responseData ||
          !responseData.items ||
          responseData.items.length === 0
        ) {
          dispatch({
            type: Types.SEARCH_FAIL,
            message: inputKey + "什么都没找到"
          });
          return;
        }
        let items = responseData.items;
        getFavoriteKeys(inputKey, dispatch, items, token, popularKeys);
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: Types.SEARCH_FAIL, error: e });
      });
  };
}
```
