import { Flex, Divider, HStack, Text, Modal, FormControl, Input, Button } from "native-base";
import Icon from 'react-native-vector-icons/Entypo';
import { ReactNode, useContext, useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { context } from "../contexts";
import supabase from "../services/supabase";


interface Props{
    children?: ReactNode;
    title?:string;
}

export default function ExpenseInfo({children, title}: Props){

    return(
        <Flex w="100%" py="4" minH="100vh" maxH="auto" bg="white" >
            <Flex mb="4" px="3" alignItems="flex-end" flexDirection="row" justifyContent="space-between" >
                <Text fontSize="lg" fontWeight="medium">{title}</Text>
                <Icon name="dots-three-vertical" size={17} color="gray" />
            </Flex>
            <Divider mb="4" />
            {children}
        </Flex>
    )
}