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
