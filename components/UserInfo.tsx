import { HStack, Avatar, Center, Flex, Text } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function UserInfo(){
    return(
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
    )
}