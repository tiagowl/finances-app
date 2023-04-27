import { Box, Flex, Divider, Spinner } from "native-base";
import BillingInfoItem from "./BillingInfoItem";
import { useContext } from "react";
import { context } from "../contexts";

export default function BillingInfoBox(){

    const Maincontext = useContext(context);

    return(
        <Box bg="blue.500" mb="4" maxH="auto" justifyContent="center" minH="40" p="5" borderRadius="lg">
          {Maincontext.loading ? <Spinner color="blueGray.700" size="sm" m="0 auto" /> : 
          <>
            <BillingInfoItem big title="Salary Remaining" valor={Maincontext?.remaining} />
            <Flex flexDirection="row" w="100%">
              <BillingInfoItem title="Total Expenses" valor={Maincontext?.totalExpenses} />
              <Divider orientation="vertical" mr="10"/>
              <BillingInfoItem title="Income" valor={200} />
            </Flex>
          </>}
        </Box>
    )
}