### FLatList

- 跨平台
- 支持水平布局
- 支持下拉刷新
- 支持上拉加载

> normal example

```js
<FlatList
  data={[{ key: "a" }]}
  renderItem={({ item }) => <Text>{item.key}</Text>}
/>
```

> 下拉刷新

```js
import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

const CITY_NAMES = ["a", "b", "c", "d"];

export default class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITY_NAMES
    };
  }

  loadData() {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      let dataArray = [];
      for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
        dataArray.push(this.state.dataArray[i]);
      }
      this.setState({
        dataArray,
        isLoading: false
      });
    }, 2000);
  }

  _renderItem(data) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          refreshing={this.state.isLoading}
          onRefresh={() => {
            this.loadData();
          }}
        />
      </View>
    );
  }
}
```

> 上拉加载

```js
import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from "react-native";

const CITY_NAMES = ["a", "b", "c", "d"];

export default class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITY_NAMES
    };
  }

  loadData(refreshing) {
    if (refreshing) {
      this.setState({
        isLoading: true
      });
    }
    setTimeout(() => {
      let dataArray = [];
      if (refreshing) {
        for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
          dataArray.push(this.state.dataArray[i]);
        }
      } else {
        dataArray = this.state.dataArray.concat(CITY_NAMES);
      }
      this.setState({
        dataArray,
        isLoading: false
      });
    }, 2000);
  }

  _renderItem(data) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    );
  }

  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          animating={true}
          color={"red"}
        />
        <Text>Loading...</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          refreshControl={
            // 设定自定义刷新样式
            <RefreshControl
              title={"Loading"}
              colors={["red"]}
              tintColor={"orange"}
              titleColor={"red"}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          // 上拉加载在这里调用onEndReached
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.loadData();
          }}
        />
      </View>
    );
  }
}
```

### Swipeable Flat List

```js
import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SwipeableFlatList,
  TouchableHighlight
} from "react-native";

const CITY_NAMES = ["a", "b", "c", "d"];

export default class SwipeableDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITY_NAMES
    };
  }

  loadData(refreshing) {
    if (refreshing) {
      this.setState({
        isLoading: true
      });
    }
    setTimeout(() => {
      let dataArray = [];
      if (refreshing) {
        for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
          dataArray.push(this.state.dataArray[i]);
        }
      } else {
        dataArray = this.state.dataArray.concat(CITY_NAMES);
      }
      this.setState({
        dataArray,
        isLoading: false
      });
    }, 2000);
  }

  _renderItem(data) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    );
  }

  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          animating={true}
          color={"red"}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  genQuickActions() {
    return (
      <View style={styles.quickContainer}>
        <TouchableHighlight
          onPress={() => {
            alert("Confirm delete?");
          }}
        >
          <View style={styles.quick}>
            <Text style={styles.text}>delete</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <SwipeableFlatList
          data={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          refreshControl={
            <RefreshControl
              title={"Loading"}
              colors={["red"]}
              tintColor={"orange"}
              titleColor={"red"}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.loadData();
          }}
          // swipeable flat list 用法
          renderQuickActions={() => this.genQuickActions()}
          maxSwipeDistance={100}
          bounceFirstRowOnMount={false}
        />
      </View>
    );
  }
}
```

### Section List

```js
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SwipeableFlatList,
  TouchableHighlight,
  SectionList
} from "react-native";

const CITY_NAMES = [
  { data: ["a", "b"], title: "one" },
  { data: ["c", "d"], title: "two" }
];

export default class SectionListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITY_NAMES
    };
  }

  loadData(refreshing) {
    if (refreshing) {
      this.setState({
        isLoading: true
      });
    }
    setTimeout(() => {
      let dataArray = [];
      if (refreshing) {
        for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
          dataArray.push(this.state.dataArray[i]);
        }
      } else {
        dataArray = this.state.dataArray.concat(CITY_NAMES);
      }
      this.setState({
        dataArray,
        isLoading: false
      });
    }, 2000);
  }

  _renderItem(data) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    );
  }

  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          animating={true}
          color={"red"}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  genQuickActions() {
    return (
      <View style={styles.quickContainer}>
        <TouchableHighlight
          onPress={() => {
            alert("Confirm delete?");
          }}
        >
          <View style={styles.quick}>
            <Text style={styles.text}>delete</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  _renderSectionHeader({ section }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.text}>{section.title}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          refreshControl={
            <RefreshControl
              title={"Loading"}
              colors={["red"]}
              tintColor={"orange"}
              titleColor={"red"}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.loadData();
          }}
          renderQuickActions={() => this.genQuickActions()}
          maxSwipeDistance={100}
          bounceFirstRowOnMount={false}
          // section list usage here
          renderSectionHeader={data => this._renderSectionHeader(data)}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      </View>
    );
  }
}
```
