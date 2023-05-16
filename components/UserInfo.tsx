import { HStack, Avatar, Center, Flex, Text } from "native-base";
import { useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { context } from "../contexts";
import { FontAwesome5 } from '@expo/vector-icons';

export default function UserInfo(){

    const Maincontext = useContext(context);

    return(
        <HStack alignItems="center" space="2.5" mb="4" >  
          <Avatar bg="green.500" size="md" source={{
            uri: Maincontext?.avatar
          }}/>
          <Center bg="primary.400" borderRadius="md" _text={{
            color: "white",
            fontWeight: "bold"
          }} height={30} width={{
              lg: 30,
              base: 35
          }}>
            <FontAwesome5 name="money-bill" size={17} color="white" />
        </Center>
          <Flex>
              <Text fontSize="xs" >Tiago Landi</Text>
              <Text fontSize="sm" fontWeight="bold" >R$ {Maincontext?.salary}</Text>
          </Flex>
        </HStack>
    )
}