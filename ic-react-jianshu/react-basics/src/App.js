import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  handleToggle = () => {
    this.setState(() => {
      return {
        show: this.state.show ? false : true
      };
    });
  };

  render() {
    return (
      <Fragment>
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames="fade"
          unmountOnExit
          onEnter={el => {
            el.style.color = "blue";
          }}
          appear={true}
        >
          <div>App</div>
        </CSSTransition>
        <button onClick={this.handleToggle}>toggle</button>
      </Fragment>
    );
  }
}

export default App;
