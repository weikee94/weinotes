import React, { Component } from "react";
import { Button, Text, View } from "react-native";

export default class HomePage extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text> Home Page </Text>
        <Button
          title={"Go To Page1"}
          onPress={() => {
            navigation.navigate("Page1", { name: "动态" });
          }}
        />
      </View>
    );
  }
}
