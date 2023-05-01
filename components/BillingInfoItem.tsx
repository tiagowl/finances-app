import { Flex, Text } from "native-base";

interface BillingInfoItemProps{
    title: string;
    valor: number;
    big?: boolean
}

export default function BillingInfoItem({title, valor, big}: BillingInfoItemProps){
    return(
        <Flex flexDirection="column" mr="10" >
            <Text fontSize="xs" color="black" >{title}</Text>
            <Text fontSize={big ? "3xl" : "lg"} fontWeight="bold" color="black" >{valor}</Text>
        </Flex>
    )
}