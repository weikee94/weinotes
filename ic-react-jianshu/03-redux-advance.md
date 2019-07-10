### UI component And Container component

> ui component handle display; container component handle business logic

```js
// ui component, below this one also called stateless component
const TodoListUI = props => {
  return (
    <div style={{ marginTop: 10, marginLeft: 10 }}>
      <div>
        <Input
          placeholder="todo info"
          value={props.inputValue}
          style={{ width: 300, marginRight: 10 }}
          onChange={props.handleInputChange}
        />
        <Button type="primary" onClick={props.handleInputSubmit}>
          Submit
        </Button>
      </div>
      <List
        style={{ marginTop: 10, width: 300 }}
        bordered
        dataSource={props.list}
        renderItem={(item, index) => (
          <List.Item onClick={() => props.handleInputDelete(index)}>
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};

// container component
class TodoListAntd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
  };

  handleInputChange = e => {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  };

  handleInputSubmit = () => {
    const action = getInputSubmitAction();
    store.dispatch(action);
  };

  handleInputDelete = index => {
    const action = getInputDeleteAction(index);
    store.dispatch(action);
  };

  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleInputSubmit={this.handleInputSubmit}
        handleInputDelete={this.handleInputDelete}
      />
    );
  }
}
```

### Redux 发送异步请求获取数据

```js
 componentDidMount() {
    axios
      .get("https://testapi.io/api/weikee94/list.json")
      .then(res => {
        const data = res.data;
        const action = initListAction(data);
        store.dispatch(action);
      })
      .catch(() => {});
  }

```

### Redux Dev Tools and redux-thunk

```js
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;
```

### React-Redux

> use provider from react redux and wrap with todolist, now component inside provider can access store data

```js
import { Provider } from "react-redux";
import store from "./store";

const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

ReactDOM.render(App, document.getElementById("root"));
```

### React-Redux-Advance-Example

```js
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getInputChangeAction,
  getInputSubmitAction
} from "./store/actionCreators";

class TodoList extends Component {
  handleClick = () => {};

  handleInputChange = e => {
    console.log(e.target.value);
  };

  render() {
    return (
      <div>
        <input
          value={this.props.inputValue}
          onChange={this.props.changeInputValue}
        />
        <button onClick={this.props.handleClick}>submit</button>
        <ul>
          {this.props.list.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    list: state.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInputValue(e) {
      const action = getInputChangeAction(e.target.value);
      dispatch(action);
    },
    handleClick() {
      const action = getInputSubmitAction();
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
```
