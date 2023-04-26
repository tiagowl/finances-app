import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "../screens/Main";
import { NavigationContainer } from "@react-navigation/native";
import Savings from "../screens/Savings";
import Profile from "../screens/Profile";
import ExpenseItem from "../screens/ExpenseItem";
import SavingItem from "../screens/SavingItem";

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
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ExpenseItem" component={ExpenseItem} />
            <Stack.Screen name="SavingItem" component={SavingItem} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}