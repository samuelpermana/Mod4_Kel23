import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/HomeScreen";

const stackNavigator = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, 
        }}
      >
        <stackNavigator.Screen name="Home" component={HomeScreen} />
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}
