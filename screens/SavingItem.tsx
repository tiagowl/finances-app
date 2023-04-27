import { Button, FormControl, HStack, Input, Modal, Spinner } from "native-base";
import ExpenseInfo from "../components/ExpenseInfo";
import ExpenseItemInfo from "../components/ExpenseItemInfo";
import { useContext, useEffect, useState } from "react";
import { Saving } from "../types/saving";
import supabase from "../services/supabase";
import { context } from "../contexts";

interface SavingDetailsScreenProps{
    route: {
        params: {
          savingId: number;
        }
    }
}

interface UpdateSavingModalProps{
    open: boolean;
    id: number;
}

const UpdateExpenseModal = ({open, id}: UpdateSavingModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState<Partial<Saving>>({name: "", expense: 0});
    const MainContext = useContext(context);

    const fetchExpense = async() => {
        setLoading(true);
        let {data: savings, error} = await supabase.from("savings").select("*").eq("id", `${id}`);
        if(savings){
            setLoading(false);
            setSaving(savings[0] as Saving);
        }
    }

    const updateExpense = async() => {
        setLoading(true);
        const {data, error} = await supabase.from("savings").update(saving).eq("id", `${id}`);
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

export default function SavingItem({route}: SavingDetailsScreenProps){

    const [saving, setSaving] = useState<Saving>();
    const { savingId } = route.params;
    const [loading, setLoading] = useState(false);
    const [openUpdateSavingModal, setOpenUpdateSavingModal] = useState(false);

    const fetchSaving = async() => {
        setLoading(true);
        let {data: savings, error} = await supabase.from("savings").select("*").eq("id", `${savingId}`);
        if(savings){
            setLoading(false);
            setSaving(savings[0] as Saving);
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
                    <Button size="sm" >Delete</Button>
                    <Button size="sm" >Remove</Button>
                    <Button size="sm" >Save</Button>
                </HStack>
            </>}
            <UpdateExpenseModal id={savingId} open={openUpdateSavingModal} />
        </ExpenseInfo>
    )
}