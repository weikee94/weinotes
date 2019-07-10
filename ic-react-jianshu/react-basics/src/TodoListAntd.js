import React, { Component } from "react";
import store from "./store/index";
import "antd/dist/antd.css";
import {
  getInputChangeAction,
  getInputSubmitAction,
  getInputDeleteAction,
  getTodoList
} from "./store/actionCreators";

import TodoListUI from "./TodoListUI";

class TodoListAntd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
  }

  componentDidMount() {
    const action = getTodoList();
    store.dispatch(action);
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

export default TodoListAntd;
