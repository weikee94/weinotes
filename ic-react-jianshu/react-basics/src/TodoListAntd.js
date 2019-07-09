import React, { Component } from "react";
import { Input, Button, List } from "antd";
import "antd/dist/antd.css";
import store from "./store/index";

import {
  getInputChangeAction,
  getInputSubmitAction,
  getInputDeleteAction
} from "./store/actionCreators";

class TodoListAntd extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    console.log(store.getState());
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    console.log("store change");
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
      <div style={{ marginTop: 10, marginLeft: 10 }}>
        <div>
          <Input
            placeholder="todo info"
            value={this.state.inputValue}
            style={{ width: 300, marginRight: 10 }}
            onChange={this.handleInputChange}
          />
          <Button type="primary" onClick={this.handleInputSubmit}>
            Submit
          </Button>
        </div>
        <List
          style={{ marginTop: 10, width: 300 }}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item onClick={() => this.handleInputDelete(index)}>
              {item}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TodoListAntd;
