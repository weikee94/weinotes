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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#169",
    height: 200,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 20
  }
});
