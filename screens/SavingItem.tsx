import { HStack } from "native-base";
import ExpenseInfo from "../components/ExpenseInfo";
import ExpenseItemInfo from "../components/ExpenseItemInfo";

export default function SavingItem(){
    return(
        <ExpenseInfo title="Expense Details" >
            <HStack px="3" space="9" >
                <ExpenseItemInfo name="Name" info="Plus Extra" />
                <ExpenseItemInfo name="Plan" info="3 meses" />
                <ExpenseItemInfo name="Price" info="1250" />
            </HStack>
        </ExpenseInfo>
    )
}