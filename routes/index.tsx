import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "../screens/Main";
import { NavigationContainer } from "@react-navigation/native";
import Savings from "../screens/Savings";

const Stack = createStackNavigator();

const options = {
  headerShown: false
}

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={options} name="Main" component={MainPage} />
            <Stack.Screen options={options} name="Savings" component={Savings} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}