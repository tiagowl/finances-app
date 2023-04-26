import { Avatar, Box, Flex, Text, VStack } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconList from "react-native-vector-icons/Octicons";

export default function Profile(){
    return(
        <Flex w="100%" minH="100vh" maxH="auto" bg="gray.100" >
            <Box bg="white" p="4" h="auto" mb="4" w="100%" borderBottomLeftRadius="2xl" borderBottomRightRadius="2xl" >
                <Flex w="100%" flexDirection="row" alignItems="flex-start" >
                <Avatar bg="green.500" size="lg" mr="3" source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}/>
                <Text fontWeight="bold" mr="1" fontSize="lg" color="blueGray.700" >Tiago Landi</Text>
                <Icon name="check-decagram" size={20} color="#4582EC" />
                </Flex>
            </Box>
            <Box bg="white" p="4" h="auto" w="100%" borderRadius="2xl" >
                <Flex flexDirection="row" mb="4" justifyContent="space-between" >
                    <Flex flexDirection="row">
                        <IconList name="checklist" size={20} color="gray" />
                        <Text color="blueGray.700" ml="2" fontSize="sm" fontWeight="bold" >Informations</Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.400" >Edit</Text>
                </Flex>
                <VStack space="2" >
                    <Flex>
                        <Text fontSize="sm" fontWeight="bold" color="blueGray.700" >Salary</Text>
                        <Text fontSize="sm" color="gray.400" >4000</Text>
                    </Flex>
                    <Flex>
                        <Text fontSize="sm" fontWeight="bold" color="blueGray.700" >Income</Text>
                        <Text fontSize="sm" color="gray.400" >200</Text>
                    </Flex>
                    <Flex>
                        <Text fontSize="sm" fontWeight="bold" color="blueGray.700" >Avatar Url</Text>
                        <Text fontSize="sm" color="gray.400" >200</Text>
                    </Flex>
                </VStack>
            </Box>
        </Flex>
    )
}