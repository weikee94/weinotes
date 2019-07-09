import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  // 当一个从父组件接受参数
  // 只要父组件render函数被重新执行， 子组件这个函数就会被执行
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true;
    }
    return false;
  }

  // 当组件即将被剔除会被执行
  componentWillUnmount() {
    console.log("child componentWillUnmount");
  }

  handleClick() {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }

  render() {
    console.log("child render");
    const { content } = this.props;
    return <div onClick={this.handleClick}>{content}</div>;
  }
}

TodoItem.propTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
};

TodoItem.defaultProps = {
  test: "Hello World"
};

export default TodoItem;
