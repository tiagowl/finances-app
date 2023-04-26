import { NavigationAction } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Flex, Text, Circle, Avatar, Box, Center, Divider, HStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number };
    Savings: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props{
    children?: ReactNode;
    title: string;
    navigation?: HomeScreenNavigationProp
}

interface BillingInfoItemProps{
    title: string;
    valor: number;
    big?: boolean
  }
  
  interface BillingTypeItemProps{
    icon: string;
    type: string;
    navigate?: string;
  }
  
  function BillingInfoItem({title, valor, big}: BillingInfoItemProps){
    return(
      <Flex flexDirection="column" mr="10" >
        <Text fontSize="sm" color="blue.300" >{title}</Text>
        <Text fontSize={big ? "4xl" : "lg"} fontWeight="bold" color="white" >{valor}</Text>
      </Flex>
    );
  }
  
  function BillingTypeItem({icon, type, navigate}: BillingTypeItemProps){
    return(
      <Flex>
        <Circle size="3rem" bg="white" mb="2" >
          <Icon name={icon} size={20} color="#162237" />
        </Circle>
        <Text color="blueGray.700" >{type}</Text>
      </Flex>
    )
  }

export default function Main({children, title, navigation}: Props){
    return(
        <Flex w="100%" minH="100vh" maxH="auto" p="5" bg="gray.100" >
        <HStack alignItems="center" space="2.5" mb="4" >  
          <Avatar bg="green.500" size="md" source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}/>
          <Center bg="primary.400" borderRadius="md" _text={{
            color: "white",
            fontWeight: "bold"
          }} height={30} width={{
              lg: 30,
              base: 35
          }}>
            <Icon name="money-bill" size={17} color="white" />
        </Center>
          <Flex>
              <Text fontSize="xs" >Tiago Landi</Text>
              <Text fontSize="sm" fontWeight="bold" >R$ 4000</Text>
          </Flex>
        </HStack>
        <Box bg="blue.500" mb="4" h="auto" p="5" borderRadius="lg">
          <BillingInfoItem big title="Salary Remaining" valor={3000} />
          <Flex flexDirection="row" w="100%">
            <BillingInfoItem title="Total Expenses" valor={1000} />
            <Divider orientation="vertical" mr="10"/>
            <BillingInfoItem title="Income" valor={200} />
          </Flex>
        </Box>
        <HStack space="4" mb="4" >
          <Flex>
            <BillingTypeItem icon="money-bill-wave-alt" type="Expenses" />
          </Flex>
          <TouchableOpacity onPress={()=>navigation && navigation.navigate("Savings")} >
            <BillingTypeItem icon="money-bill-wave-alt" type="Savings" />
          </TouchableOpacity>
          
        </HStack>
        <Text color="blueGray.700" fontWeight="bold" fontSize="lg" mb="4" >{title}</Text>
        {children}
      </Flex>
    )
}