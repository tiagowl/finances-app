import { Box, Flex, Divider } from "native-base";
import BillingInfoItem from "./BillingInfoItem";

export default function BillingInfoBox(){
    return(
        <Box bg="blue.500" mb="4" h="auto" p="5" borderRadius="lg">
          <BillingInfoItem big title="Salary Remaining" valor={3000} />
          <Flex flexDirection="row" w="100%">
            <BillingInfoItem title="Total Expenses" valor={1000} />
            <Divider orientation="vertical" mr="10"/>
            <BillingInfoItem title="Income" valor={200} />
          </Flex>
        </Box>
    )
}