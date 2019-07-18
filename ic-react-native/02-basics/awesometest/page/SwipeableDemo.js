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
          renderQuickActions={() => this.genQuickActions()}
          maxSwipeDistance={100}
          bounceFirstRowOnMount={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#169",
    height: 80,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 20
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    margin: 10
  },
  quick: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
    width: 200
  },
  quickContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    marginBottom: 15
  }
});
