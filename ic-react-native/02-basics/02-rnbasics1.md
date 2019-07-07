### 延展属性 spread attributes

```js
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
```

> sequence is important, the following will override default

```js
var props = { foo: "x" };
var component = <Component {...props} foo={"y"} />;
console.log(component.props.foo); // 'y'
```

### PropTypes

- used for identify whether the component attributes valid or not

```js
import PropTypes from "prop-types";
class MyTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  render() {
    return <h1>title: {this.props.title} </h1>;
  }
}
ReactDOM.render(<MyTitle title={lala} />, document.getElementById("root"));
```

### Default Props

```js
class MyTitle extends React.Component {
  static defaultProps = {
    shortName: "MyTitle"
  };
  render() {
    return <h1>{this.props.shortName}</h1>;
  }
}
ReactDOM.render(<MyTitle />, document.getElementById("root"));
// result: 'MyTitle'
```

### Ref (不明白)

> 组件 MyTitle 有一个 Alert 组件, 为了调用这个组件的方法, 这时就必须获取真实的 DOM 节点, 虚拟 DOM 拿不到用户输入的. 为了做到这一点, 我们在使用这个组件必须设置 ref 属性, 然后 this.refs.[refName]就会返回这个真实的 DOM 节点. 需要注意必须等到 virtual dom 插入文档以后, 才能使用这个属性, 否则会报错. 我们通过 click 事件的回调函数, 确保只有等到真实 DOM 发生 Click 事件之后,才会读取 this.refs.[refName]属性. this.ref 通常运用在读写对象的变量,甚至调用对象的函数. 除了 click 事件,还有 keydown, scroll, copy and etc.

```js
class Alert extends React.Component {
  showAlert(message) {
    alert(`Debug:${message}`);
  }
  render() {
    return null;
  }
}

class MyTitle extends React.Component {
  onClick = () => {
    this.refs.alert.showAlert("MyTitle");
  };

  render() {
    return;
    <div>
      <h1 onClick={this.onClick}>Click Me</h1>
      <Alert ref="alert" />
    </div>;
  }
}

ReactDOM.render(<MyTitle />, document.getElementById("root"));
```

### Initial State

```js
constructor(props) {
    super(props);
    this.state = {
        name: ''
    }
}

state = {
    name: ''
}
```

### Update State

> this.setState() update state. After invoke this function, react will re-render related UI component.

> this.props and this.state used to describe the component. this.props used for those unchangeable, this.state used for those will change based on whatever user change.

```js
class FavouriteButton extends React.Component {
  state = {
    favourite: false
  };
  handleClick = () => {
    this.setState({
      favourite: !this.state.favourite
    });
  };
  render() {
    const text = this.state.favourite ? "favourite" : "un favourite";
    return <h1 onClick={this.handleClick}>You {text} this. Click to toggle</h1>;
  }
}
```
