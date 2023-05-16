import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "../screens/Main";
import { NavigationContainer } from "@react-navigation/native";
import Savings from "../screens/Savings";
import Profile from "../screens/Profile";
import ExpenseItem from "../screens/ExpenseItem";
import SavingItem from "../screens/SavingItem";
import { RootStackParamList } from "types/routes";
import { FunctionComponent } from "react";

const Stack = createStackNavigator();

const options = {
  headerShown: false
}

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen options={options} name="Main" component={MainPage as FunctionComponent<{}>} />
            <Stack.Screen options={options} name="Savings" component={Savings as FunctionComponent<{}>} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ExpenseItem" component={ExpenseItem as FunctionComponent<{}>} />
            <Stack.Screen name="SavingItem" component={SavingItem as  FunctionComponent<{}> } />
        </Stack.Navigator>
    </NavigationContainer>
  );
}