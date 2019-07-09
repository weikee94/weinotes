import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList";
import TodoListAntd from "./TodoListAntd";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/index";

ReactDOM.render(
  <TodoListAntd store={store} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
