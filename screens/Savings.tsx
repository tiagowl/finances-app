import { Flex, HStack, Text, FlatList } from "native-base";
import { TouchableOpacity } from "react-native";
import BillingInfoBox from "../components/BillingInfoBox";
import BillingTypeItem from "../components/BillingTypeItem";
import ExpenseItem, { ExpenseItemProps } from "../components/ExpenseItem";
import UserInfo from "../components/UserInfo";
import { ScreenProps } from "../types/screens";

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
            <FlatList data={data} maxH="72" renderItem={({item})=>
                <TouchableOpacity onPress={()=>navigation && navigation.navigate("SavingItem")} >
                    <ExpenseItem title={item.title} subTitle={item.subTitle} price={item.price} />
                </TouchableOpacity>
             } />
        </Flex>
    )
}