import { Avatar, Box, Button, Flex, FormControl, Input, Modal, Spinner, Text, VStack } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconList from "react-native-vector-icons/Octicons";
import { context } from "../contexts";
import { useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import supabase from "../services/supabase";
import { TouchableOpacity } from "react-native";
import IconSave from "react-native-vector-icons/MaterialIcons";

interface UpdateExpenseModalProps{
    open: boolean;
}

const AddIncome = ({open}: UpdateExpenseModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [user, setUser] = useState<Partial<User>>({income: 0});
    const [loading, setLoading] = useState(false);
    const [income, setIncome] = useState(0);
    const MainContext = useContext(context);

    const fetchUser = async() => {
        setLoading(true);
        let {data: users, error} = await supabase.from("users").select("*").eq("id", `2`);
        if(users){
            setLoading(false);
            setUser(users[0] as User);
        }
    }

    const updateUser = async() => {
        setLoading(true);
        const {data, error} = await supabase.from("users").update({income: user?.income != undefined && income + user?.income}).eq("id", `2`);
        if(!error){
            MainContext.fetchUserData();
            setOpen(false);
        }
    }

    useEffect(()=>{
        fetchUser();
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
          <Modal.Header>Add Income</Modal.Header>
          <Modal.Body>
            <FormControl>
                    <FormControl.Label>Income</FormControl.Label>
                    <Input value={`${income}`} keyboardType="numeric" onChangeText={(value)=>setIncome(Number(value))} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button isLoading={loading} flex="1" bg="blue.500" onPress={updateUser}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )

}

const UpdateUserModal = ({open}: UpdateExpenseModalProps) => {

    const [openModal, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<Partial<User>>({avatar_url: "", salary: 0});
    const MainContext = useContext(context);

    const fetchUser = async() => {
        setLoading(true);
        let {data: users, error} = await supabase.from("users").select("*").eq("id", `2`);
        if(users){
            setLoading(false);
            setUser(users[0] as User);
        }
    }

    const updateUser = async() => {
        setLoading(true);
        const {data, error} = await supabase.from("users").update(user).eq("id", `2`);
        if(!error){
            MainContext.fetchUserData();
            setOpen(false);
        }
    }

    useEffect(()=>{
        fetchUser();
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
                    <FormControl.Label>Salary</FormControl.Label>
                    <Input value={`${user?.salary}`} keyboardType="numeric" onChangeText={(value)=>setUser({...user, salary: Number(value)})} />
            </FormControl>
            <FormControl mt="3">
                <FormControl.Label>Plan</FormControl.Label>
                <Input value={user?.avatar_url} onChangeText={(value)=>setUser({...user, avatar_url: value})} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button isLoading={loading} flex="1" bg="blue.500" onPress={updateUser}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )
}

export default function Profile(){

    const {salary, loading, income, avatar} = useContext(context);
    const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    return(
        <Flex w="100%" minH="100vh" maxH="auto" bg="gray.100" >
            <Box bg="white" p="4" h="auto" mb="4" w="100%" borderBottomLeftRadius="2xl" borderBottomRightRadius="2xl" >
                <Flex w="100%" flexDirection="row" alignItems="flex-start" >
                <Avatar bg="green.500" size="lg" mr="3" source={{
                    uri: avatar
                }}/>
                <Text fontWeight="bold" mr="1" fontSize="lg" color="blueGray.700" >Tiago Landi</Text>
                <Icon name="check-decagram" size={20} color="#4582EC" />
                </Flex>
            </Box>
            <Box bg="white" p="4" h="auto" w="100%" borderRadius="2xl" >
                <Flex flexDirection="row" mb="4" justifyContent="space-between" >
                    <Flex flexDirection="row">
                        <IconList name="checklist" size={20} color="gray" />
                        <Text color="blueGray.700" ml="2" fontSize="sm" fontWeight="bold" >Informations</Text>
                    </Flex>
                    <TouchableOpacity onPress={()=>setOpenUpdateUserModal(true)} >
                        <Text fontSize="sm" color="gray.400" >Edit</Text>
                    </TouchableOpacity>
                </Flex>
                {loading ? <Spinner color="blueGray.700" size="sm" m="0 auto"/> : 
                <VStack space="2" >
                    <Flex>
                        <Text fontSize="sm" fontWeight="bold" color="blueGray.700" >Salary</Text>
                        <Text fontSize="sm" color="gray.400" >{salary}</Text>
                    </Flex>
                    <Flex flexDirection="row" w="100%" justifyContent="space-between" alignItems="center" >
                        <Flex>
                            <Text fontSize="sm" fontWeight="bold" color="blueGray.700" >Income</Text>
                            <Text fontSize="sm" color="gray.400" >{income}</Text>
                        </Flex>
                        <TouchableOpacity onPress={()=>setOpenAddIncomeModal(true)} >
                            <IconSave name="save-alt" size={20} color="#162237" />
                        </TouchableOpacity>
                    </Flex>
                    <Flex>
                        <Text fontSize="sm" fontWeight="bold" color="blueGray.700" >Avatar Url</Text>
                        <Text fontSize="sm" color="gray.400" >{avatar}</Text>
                    </Flex>
                </VStack>}
            </Box>
            <UpdateUserModal open={openUpdateUserModal} />
            <AddIncome open={openAddIncomeModal} />
        </Flex>
    )
}