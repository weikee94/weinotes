import { createStackNavigator } from "react-navigation";
import { Button } from "react-native";
import HomePage from "../page/HomePage";
import Page1 from "../page/Page1";
import FlatListDemo from "../page/FlatListDemo";

export const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage
  },
  Page1: {
    screen: Page1,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}name`
    })
  },
  FlatListDemo: {
    screen: FlatListDemo,
    navigationOptions: ({ navigation }) => ({
      title: "FlatListDemo"
    })
  }
});
