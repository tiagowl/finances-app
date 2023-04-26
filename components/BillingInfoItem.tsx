import { Flex, Text } from "native-base";

interface BillingInfoItemProps{
    title: string;
    valor: number;
    big?: boolean
}

export default function BillingInfoItem({title, valor, big}: BillingInfoItemProps){
    return(
        <Flex flexDirection="column" mr="10" >
            <Text fontSize="sm" color="blue.300" >{title}</Text>
            <Text fontSize={big ? "4xl" : "lg"} fontWeight="bold" color="white" >{valor}</Text>
        </Flex>
    )
}