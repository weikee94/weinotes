import React, { Component } from "react";
import { Button, Text, View } from "react-native";

export default class Page1 extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text> page1 </Text>
        <Button
          title={"Go Back"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }
}
