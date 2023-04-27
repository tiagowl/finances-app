import { Button, FormControl, HStack, Input, Modal, Spinner } from "native-base";
import ExpenseInfo from "../components/ExpenseInfo";
import ExpenseItemInfo from "../components/ExpenseItemInfo";
import supabase from "../services/supabase";
import { useContext, useEffect, useState } from "react";
import { Expense } from "../types/expense";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/routes";
import { context } from "../contexts";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface ExpenseDetailsScreenProps {
    route: {
      params: {
        expenseId: number;
      }
    },
    navigation?: HomeScreenNavigationProp
}

interface UpdateExpenseModalProps{
    open: boolean;
    id: number;
}

const UpdateExpenseModal = ({open, id}: UpdateExpenseModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState<Partial<Expense>>({name: "", plan: "", price: 0});
    const MainContext = useContext(context);

    const fetchExpense = async() => {
        setLoading(true);
        let {data: expenses, error} = await supabase.from("expenses").select("*").eq("id", `${id}`);
        if(expenses){
            setLoading(false);
            setExpense(expenses[0] as Expense);
        }
    }

    const updateExpense = async() => {
        setLoading(true);
        const {data, error} = await supabase.from("expenses").update(expense).eq("id", `${id}`);
        if(!error){
            MainContext.fetchExpenses();
            setOpen(false);
        }
    }

    useEffect(()=>{
        fetchExpense();
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
            <Button isLoading={loading} flex="1" bg="blue.500" onPress={updateExpense}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )
}

export default function ExpenseItem({route, navigation}: ExpenseDetailsScreenProps){

    const { expenseId } = route.params;
    const [expense, setExpense] = useState<Expense>();
    const [loading, setLoading] = useState(false);
    const MainContext = useContext(context);
    const [openUpdateExpenseModal, setOpenUpdateExpenseModal] = useState(false);

    const fetchExpense = async() => {
        setLoading(true);
        let {data: expenses, error} = await supabase.from("expenses").select("*").eq("id", `${expenseId}`);
        if(expenses){
            setLoading(false);
            setExpense(expenses[0] as Expense);
        }
    }

    const deleteExpense = async() => {
        setLoading(true);
        const {data, error} = await supabase.from("expenses").delete().eq("id", `${expenseId}`);
        if(!error){
            MainContext.fetchExpenses();
            navigation?.navigate("Main");
        }
    }

    useEffect(()=>{
        fetchExpense();
    }, [])

    return(
        <ExpenseInfo title="Expense Details">
            {loading ? <Spinner color="blueGray.700" size="sm" m="0 auto"/> :
            <HStack px="3" space="9" alignItems="center" >
                <ExpenseItemInfo name="Name" info={`${expense?.name}`} />
                <ExpenseItemInfo name="Plan" info={`${expense?.plan}`} />
                <ExpenseItemInfo name="Price" info={`${expense?.price}`} />
                <TouchableOpacity onPress={()=>setOpenUpdateExpenseModal(true)} >
                    <Icon name="pencil-box" size={20} color="#162237" />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteExpense} >
                    <Icon name="close-box-multiple" size={20} color="#162237" />
                </TouchableOpacity>
            </HStack>}
            <UpdateExpenseModal id={expenseId} open={openUpdateExpenseModal} />
        </ExpenseInfo>
    )
}