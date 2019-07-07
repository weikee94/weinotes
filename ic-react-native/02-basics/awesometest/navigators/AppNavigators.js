import { createStackNavigator } from "react-navigation";
import { Button } from "react-native";
import HomePage from "../page/HomePage";
import Page1 from "../page/Page1";

export const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage
  },
  Page1: {
    screen: Page1,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}name`
    })
  }
});
