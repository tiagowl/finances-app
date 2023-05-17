import { Button, Flex, HStack, Text, FlatList, Spinner, Modal, FormControl, Input } from "native-base";
import { TouchableOpacity } from "react-native";
import BillingInfoBox from "../components/BillingInfoBox";
import BillingTypeItem from "../components/BillingTypeItem";
import ExpenseItem, { ExpenseItemProps } from "../components/ExpenseItem";
import UserInfo from "../components/UserInfo";
import { ScreenProps } from "../types/screens";
import { useContext, useEffect, useState } from "react";
import { context } from "../contexts";
import { Saving } from "../types/saving";
import supabase from "../services/supabase";
import { StackNavigationProp } from "@react-navigation/stack";
import useFetch from "../hooks/useFetch";

const data: ExpenseItemProps[] = [
    {title: "Plus extra", price: 299, subTitle: "3 meses"},
    {title: "Render", price: 199, subTitle: "Extra"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
]

type SavingStackParamList = {
    SavingItem: {savingId: number};
    Profile: undefined;
    Main: undefined;
    Savings: undefined;
}

type SavingScreenNavigationProp = StackNavigationProp<SavingStackParamList, 'SavingItem'>;

interface SavingDetailsScreenProps {
    route: {
      params: {
        expenseId: number;
      }
    },
    navigation?: SavingScreenNavigationProp
}

interface CreateSavingModalProps{
    open: boolean;
}

const CreateSavingModal = ({open}: CreateSavingModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [saving, setSaving] = useState<Partial<Saving>>({name: "", expense: 0, total: 0});
    const [loading, setLoading] = useState(false);
    const MainContext = useContext(context);
    const {post, error} = useFetch();

    const createExpense = async() => {
        setLoading(true);
        //const {data, error} = await supabase.from("savings").insert([saving]);
        post("savings", saving);
        if(!error){
           setLoading(false);
           MainContext.fetchSavings();
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
                    <Input value={saving?.name} onChangeText={(value)=>setSaving({...saving, name: value})} />
            </FormControl>
            <FormControl mt="3">
                <FormControl.Label>Plan</FormControl.Label>
                <Input value={`${saving?.expense}`} onChangeText={(value)=>setSaving({...saving, expense: Number(value)})} />
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


export default function Savings({navigation}: SavingDetailsScreenProps){

    const MainContext = useContext(context);
    const [openCreateSavingModal, setOpenCreateSavingModal] = useState(false)

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
                <TouchableOpacity onPress={()=>setOpenCreateSavingModal(true)} >
                    <Text fontSize="xs" color="gray.400" >+ Add new</Text>
                </TouchableOpacity>
            </Flex>
            {MainContext?.loading ? <Spinner size="sm" m="0 auto" /> : 
            <FlatList data={MainContext?.savings} maxH="72" renderItem={({item})=>
                <TouchableOpacity onPress={()=>navigation && navigation.navigate("SavingItem", {savingId: item.id})} >
                    <ExpenseItem title={item.name} subTitle={`${item.expense}`} price={item.total} />
                </TouchableOpacity>
             } />}
             <CreateSavingModal open={openCreateSavingModal}/>
        </Flex>
    )
}