import { Flex, Circle, Text } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface ExpenseItemProps{
    title: string;
    subTitle: string;
    price: number;
}

export default function ExpenseItem({title, price, subTitle}: ExpenseItemProps){
    return(
        <Flex bg="white" w="100%" mb="2" borderRadius="md" py="3" px="4" flexDirection="row" justifyContent="space-between" >
            <Flex flexDirection="row" >
                <Circle size="3rem" bg="gray.100" mb="2" mr="3" >
                    <Icon name="money-bill" size={20} color="#162237" />
                </Circle>
                <Flex mr="20" >
                    <Text color="blueGray.700" fontSize="lg" w="20" fontWeight="semibold" >{title}</Text>
                    <Text color="gray.400" w="20" fontSize="md" >{subTitle}</Text>
                </Flex>
            </Flex>
            <Text color="blueGray.700" w="20" fontSize="xl" fontWeight="bold" >R${price}</Text>
        </Flex>
    )
}