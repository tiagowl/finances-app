import { Flex, HStack, Text, FlatList, Spinner } from "native-base";
import { TouchableOpacity } from "react-native";
import BillingInfoBox from "../components/BillingInfoBox";
import BillingTypeItem from "../components/BillingTypeItem";
import ExpenseItem, { ExpenseItemProps } from "../components/ExpenseItem";
import UserInfo from "../components/UserInfo";
import { ScreenProps } from "../types/screens";
import { useContext } from "react";
import { context } from "../contexts";

const data: ExpenseItemProps[] = [
    {title: "Plus extra", price: 299, subTitle: "3 meses"},
    {title: "Render", price: 199, subTitle: "Extra"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
]


export default function Savings({navigation}: ScreenProps){

    const MainContext = useContext(context);

    return(
        <Flex w="100%" minH="100vh" maxH="auto" p="5" bg="gray.100" >
            <TouchableOpacity onPress={()=>navigation && navigation.navigate("Profile")} >
                <UserInfo/>
            </TouchableOpacity>
            <BillingInfoBox/>
            <HStack space="4" mb="4" >
                <TouchableOpacity onPress={()=>navigation && navigation.navigate("Main")} >
                    <BillingTypeItem icon="money-bill-wave-alt" type="Expenses" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation && navigation.navigate("Savings")} >
                    <BillingTypeItem icon="money-bill-wave-alt" type="Savings" />
                </TouchableOpacity>
            </HStack>
            <Flex flexDirection="row" w="100%" alignItems="center" mb="4" justifyContent="space-between" >
                <Text color="blueGray.700" fontWeight="bold" fontSize="lg">Savings</Text>
                <Text fontSize="xs" color="gray.400" >+ Add new</Text>
            </Flex>
            {MainContext?.loading ? <Spinner size="sm" m="0 auto" /> : 
            <FlatList data={MainContext?.savings} maxH="72" renderItem={({item})=>
                <TouchableOpacity onPress={()=>navigation && navigation.navigate("SavingItem", {savingId: item.id})} >
                    <ExpenseItem title={item.name} subTitle={`${item.expense}`} price={item.total} />
                </TouchableOpacity>
             } />}
        </Flex>
    )
}