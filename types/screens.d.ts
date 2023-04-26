import { StackNavigationProp } from "@react-navigation/stack";
import {RootStackParamList} from "./routes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export interface ScreenProps{
    navigation?: HomeScreenNavigationProp
}