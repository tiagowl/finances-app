import { Button, FlatList, Flex, FormControl, HStack, Input, Modal, Spinner, Text } from "native-base";
import ExpenseItem, { ExpenseItemProps } from "../components/ExpenseItem";
import React, { useContext, useEffect, useState } from "react";
import BillingTypeItem from "../components/BillingTypeItem";
import { ScreenProps } from "../types/screens";
import UserInfo from "../components/UserInfo";
import BillingInfoBox from "../components/BillingInfoBox";
import { context } from "../contexts";
import { TouchableOpacity } from "react-native";
import { Expense } from "../types/expense";
import supabase from "../services/supabase";

const data: ExpenseItemProps[] = [
    {title: "Plus extra", price: 299, subTitle: "3 meses"},
    {title: "Render", price: 199, subTitle: "Extra"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
]

interface CreateExpenseModalProps{
    open: boolean;
}

const CreateExpenseModal = ({open}: CreateExpenseModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [expense, setExpense] = useState<Partial<Expense>>({name: "", plan: "", price: 0});
    const [loading, setLoading] = useState(false);
    const MainContext = useContext(context);

    const createExpense = async() => {
        setLoading(true);
        const {data, error} = await supabase.from("expenses").insert([expense]);
        if(!error){
           setLoading(false);
           MainContext.fetchExpenses();
           setOpen(false);
        }
    }

    useEffect(()=>{
        if(open === true){
            setOpen(true);
        }else{
            setOpen(false);
        }
    }, [open])

    return(
        <Modal isOpen={openModal} onClose={() => setOpen(false)} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>New Expense</Modal.Header>
          <Modal.Body>
            <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input value={expense?.name} onChangeText={(value)=>setExpense({...expense, name: value})} />
            </FormControl>
            <FormControl mt="3">
                <FormControl.Label>Plan</FormControl.Label>
                <Input value={expense?.plan} onChangeText={(value)=>setExpense({...expense, plan: value})} />
            </FormControl>
            <FormControl mt="3">
                <FormControl.Label>Price</FormControl.Label>
                <Input value={`${expense?.price}`} keyboardType="numeric" onChangeText={(value)=>setExpense({...expense, price: Number(value)})} />
            </FormControl>    
          </Modal.Body>
          <Modal.Footer>
            <Button isLoading={loading} flex="1" bg="blue.500" onPress={createExpense}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )
}

export default function MainPage({navigation}: ScreenProps){

    const MainContext = useContext(context);
    const [openNewExpenseModal, setOpenNewExpenseModal] = useState(false);

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
                <Text color="blueGray.700" fontWeight="bold" fontSize="lg">Expenses</Text>
                <TouchableOpacity onPress={()=>setOpenNewExpenseModal(true)} >
                    <Text fontSize="xs" color="gray.400" >+ Add new</Text>
                </TouchableOpacity>
            </Flex>
            {MainContext.loading ? <Spinner color="blueGray.700" size="sm" m="0 auto" /> : 
            <FlatList data={MainContext.expenses} maxH="72" renderItem={({item})=> 
                <TouchableOpacity onPress={()=>navigation && navigation.navigate("ExpenseItem", {expenseId: item.id})} >
                    <ExpenseItem title={item.name} subTitle={item.plan} price={item.price} />
                </TouchableOpacity>
            } />}
            <CreateExpenseModal open={openNewExpenseModal} />
        </Flex>
    )
}