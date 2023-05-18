import { Button, FormControl, HStack, Input, Modal, Spinner, useToast } from "native-base";
import ExpenseInfo from "../components/ExpenseInfo";
import ExpenseItemInfo from "../components/ExpenseItemInfo";
import { useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
import { context } from "../contexts";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/routes";
import useFetch from "../hooks/useFetch";
import { Saving } from "../types/saving";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface SavingDetailsScreenProps{
    route: {
        params: {
          savingId: number;
        }
    },
    navigation?: HomeScreenNavigationProp
}

interface UpdateSavingModalProps{
    open: boolean;
    id: number;
}

const Remove = ({open, id}: UpdateSavingModalProps) => {

    const [expense, setExpense] = useState(0);
    const {fetchSavings} = useContext(context);
    const [remove, setRemove] = useState(0);
    const [openModal, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const toast = useToast();
    const {del, error, get, data, put} = useFetch<Saving[]>();

    const getExpense = async() => {
        setLoading(true)
        //let { data: savings } = await supabase
        //.from('savings')
        //.select('expense, total')
        //.eq("id", `${id}`);
        get(`/expenses?id=eq.${id}&select=expense,total`);
        if(data){
            setExpense(data[0]?.expense as number);
            setTotal(data[0]?.total as number);
            setLoading(false)
        }
    }

    const removeBilling = async() => {
        setLoading(true);

        if(remove > total){
            toast.show({description: "quantity to be saved is greater than available quantity", variant: "solid"});
            setLoading(false);
        }else{
            //const { error } = await supabase
            //.from('savings')
            //.update({ total: `${total - remove}` })
            //.eq('id', `${id}`);
            put(`/expenses?id=eq.${id}`, {total: `${total - remove}`});
            if(!error){
                fetchSavings();
                setLoading(false)
                setOpen(false);
            }
        }

    }

    useEffect(()=>{
        getExpense()
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
          <Modal.Header>Remove Saving</Modal.Header>
          <Modal.Body>
            {loading ? <Spinner color="blueGray.700" size="sm" m="0 auto"/> :
            <FormControl>
                    <FormControl.Label>Total Saving</FormControl.Label>
                    <Input value={`${total}`} isDisabled/>
            </FormControl>}
            <FormControl mt="3">
                <FormControl.Label>Total to remove</FormControl.Label>
                <Input keyboardType="numeric" value={`${remove}`} onChangeText={(value)=>setRemove(Number(value))} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button isLoading={loading} isDisabled={remove > total} flex="1" bg="blue.500" onPress={removeBilling}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )

}

const Save = ({open, id}: UpdateSavingModalProps) => {

    const [expense, setExpense] = useState(0);
    const {remaining, fetchSavings} = useContext(context);
    const [save, setSave] = useState(0);
    const [openModal, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const toast = useToast();

    const getExpense = async() => {
        setLoading(true)
        let { data: savings } = await supabase
        .from('savings')
        .select('expense, total')
        .eq("id", `${id}`);
        if(savings){
            setExpense(savings[0]?.expense);
            setSave(savings[0]?.expense);
            setTotal(savings[0]?.total);
            setLoading(false)
        }
    }

    const saveBilling = async() => {
        setLoading(true);

        const totalAvailable = remaining + expense;

        if(save > totalAvailable){
            toast.show({description: "quantity to be saved is greater than available quantity", variant: "solid"});
            setLoading(false);
        }else{
            const { error } = await supabase
            .from('savings')
            .update({ total: `${save + total}` })
            .eq('id', `${id}`);
            if(!error){
                fetchSavings();
                setLoading(false)
                setOpen(false);
            }
        }

    }

    useEffect(()=>{
        getExpense()
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
          <Modal.Header>Updating Saving</Modal.Header>
          <Modal.Body>
            {loading ? <Spinner color="blueGray.700" size="sm" m="0 auto"/> :
            <FormControl>
                    <FormControl.Label>Total Available</FormControl.Label>
                    <Input value={`${remaining + expense}`} isDisabled/>
            </FormControl>}
            <FormControl mt="3">
                <FormControl.Label>Expense</FormControl.Label>
                <Input keyboardType="numeric" value={`${save}`} onChangeText={(value)=>setSave(Number(value))} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button isLoading={loading} flex="1" bg="blue.500" onPress={saveBilling}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )

}

const UpdateExpenseModal = ({open, id}: UpdateSavingModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState<Partial<Saving>>({name: "", expense: 0});
    const MainContext = useContext(context);

    const fetchExpense = async() => {
        setLoading(true);
        let {data: savings} = await supabase.from("savings").select("*").eq("id", `${id}`);
        if(savings){
            setLoading(false);
            setSaving(savings[0] as Saving);
        }
    }

    const updateExpense = async() => {
        setLoading(true);
        const {error} = await supabase.from("savings").update(saving).eq("id", `${id}`);
        if(!error){
            MainContext.fetchSavings();
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
          <Modal.Header>Updating Saving</Modal.Header>
          <Modal.Body>
            <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input value={saving?.name} onChangeText={(value)=>setSaving({...saving, name: value})} />
            </FormControl>
            <FormControl mt="3">
                <FormControl.Label>Expense</FormControl.Label>
                <Input keyboardType="numeric" value={`${saving?.expense}`} onChangeText={(value)=>setSaving({...saving, expense: Number(value)})} />
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

export default function SavingItem({route, navigation}: SavingDetailsScreenProps){

    const [saving, setSaving] = useState<Saving>();
    const { savingId } = route.params;
    const [loading, setLoading] = useState(false);
    const [openUpdateSavingModal, setOpenUpdateSavingModal] = useState(false);
    const MainContext = useContext(context);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [openRemoveSavingModal, setOpenRemoveSavingModal] = useState(false);

    const fetchSaving = async() => {
        setLoading(true);
        let {data: savings} = await supabase.from("savings").select("*").eq("id", `${savingId}`);
        if(savings){
            setLoading(false);
            setSaving(savings[0] as Saving);
        }
    }

    const deleteSaving = async() => {
        setLoading(true);

        const { error } = await supabase
        .from('savings')
        .delete()
        .eq('id', `${savingId}`);

        if(!error){
            MainContext.fetchSavings();
            setLoading(false);
            navigation?.navigate("Savings");
        }

    }

    useEffect(()=>{
        fetchSaving();
    }, [])

    return(
        <ExpenseInfo title="Saving Details" >
            {loading ? <Spinner color="blueGray.700" size="sm" m="0 auto"/> :
            <>
                <HStack px="3" space="9" mb="3" >
                    <ExpenseItemInfo name="Name" info={`${saving?.name}`} />
                    <ExpenseItemInfo name="Expense" info={`${saving?.expense}`} />
                    <ExpenseItemInfo name="Total Acumulate" info={`${saving?.total}`} />
                </HStack>
                <HStack space="4" px="4" w="100%" >
                    <Button size="sm" onPress={()=>setOpenUpdateSavingModal(true)} >Update</Button>
                    <Button size="sm" onPress={()=>deleteSaving()} >Delete</Button>
                    <Button size="sm" onPress={()=>setOpenRemoveSavingModal(true)} isDisabled={saving && saving?.total <= 0} >Remove</Button>
                    <Button size="sm" onPress={()=>setOpenSaveModal(true)} >Save</Button>
                </HStack>
            </>}
            <UpdateExpenseModal id={savingId} open={openUpdateSavingModal} />
            <Save open={openSaveModal} id={savingId} />
            <Remove open={openRemoveSavingModal} id={savingId} />
        </ExpenseInfo>
    )
}