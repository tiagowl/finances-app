import { Flex, Text } from "native-base";

interface Props{
    name: string;
    info: string;
}

export default function ExpenseItemInfo({name, info}: Props){
    return(
        <Flex>
            <Text color="gray.400" fontWeight="medium" fontSize="sm" >{name}</Text>
            <Text color="black" fontWeight="medium" fontSize="sm" >{info}</Text>
        </Flex>
    )
}