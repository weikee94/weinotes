import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDom from "react-dom";

class App extends Component {
  render() {
    return <div>App</div>;
  }
}

ReactDom.render(<App />, document.getElementById("root"));
