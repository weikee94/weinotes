import React, { Component, Fragment } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: []
    };
  }

  // 在组件即将被挂载到页面的时刻执行
  componentWillMount() {
    console.log("componentWillMount");
  }

  // 组件被挂载后自动被执行
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get("http://www.mocky.io/v2/5d2412642f00002a0024166e")
      .then(res => {
        console.log(typeof res.data);
        this.setState(() => ({
          list: res.data.split(",")
        }));
      })
      .catch(() => {
        alert("error");
      });
  }

  // 组件被更新前会自动执行
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  // 组件被更新前会自动执行, 在shouldComponentUpdate之后执行
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  // 组件更新完成后会执行
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  handleInputChange = e => {
    // const val = this.input.value;
    const val = e.target.value;
    this.setState(() => ({
      inputValue: val
    }));
  };

  handleBtnClick = () => {
    this.setState(prevState => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }));
  };

  handleItemDelete = index => {
    this.setState(prevState => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list };
    });
  };

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.handleItemDelete}
        />
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">insert</label>
          <input
            id="insertArea"
            className="input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            ref={input => {
              this.input = input;
            }}
          />
          <button onClick={this.handleBtnClick}>submit</button>
        </div>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }
}
