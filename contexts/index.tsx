import React, { ReactNode, useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { Saving } from "../types/saving";
import supabase from "../services/supabase";
import useFetch from "../hooks/useFetch";
import { User } from "types/user";

export interface ContextData{
    loading: boolean;
    salary: number;
    totalExpenses: number;
    remaining: number;
    fetchExpenses: ()=>Promise<void>;
    expenses: Expense[];
    savings: Saving[];
    fetchSavings: () => Promise<void>;
    income: number;
    avatar: string;
    fetchUserData: ()=>Promise<void>;
}

export const context = React.createContext<ContextData>({
    loading: false,
    salary: 0, 
    totalExpenses: 0, 
    remaining: 0,
    async fetchExpenses(){
        return await fetch("").then((response) => {
            return response.json();
        })
        .then((data) => {
            
        })
    },
    expenses: [],
    savings: [],
    async fetchSavings(){
        return await fetch("").then((response) => {
            return response.json();
        })
        .then((data) => {
            
        })
    },
    income: 0,
    avatar: "",
    async fetchUserData(){
        return await fetch("").then((response) => {
            return response.json();
        })
        .then((data) => {
            
        })
    }
});

interface Props{
    children?: ReactNode;
}

export default function MainContext(props: Props){

    const [salary, setSalary] = useState(0);
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = React.useState<Expense[]>();
    const [savings, setSavings] = React.useState<Saving[]>();
    const [totalExpenses, setTotal] = React.useState(0);
    const [remaining, setRemaining] = React.useState(0);
    const [income, setIncome] = useState(0);
    const [avatar, setAvatar] = useState("");
    const {get, data, error} = useFetch<User[]>();

    const fetchUserData = async () => {
        setLoading(true);
        get("/users?select=*");
        if(data){
          setSalary(data[0]?.salary as number);
          setIncome(data[0]?.income as number);
          setAvatar(data[0]?.avatar_url)
          setLoading(false);
        }
    }

    const fetchExpenses = async () =>{
        setLoading(true);
        let { data: expenses, error } = await supabase.from('expenses').select('*');
        if(expenses){
            setLoading(false);
            setExpenses(expenses as Expense[]);
        }
    }
    
    const fetchSavings = async() => {
        setLoading(true)
        let { data: savings, error } = await supabase.from('savings').select('*');
        if(savings){
            setSavings(savings as Saving[]);
            setLoading(false);
        }
    }

    const totalExpensesPrice = () => {
        const expensesPrices = expenses?.map((expense)=>(expense?.price));
        let total = expensesPrices && expensesPrices.reduce((acc, curr)=> acc + curr, 0);
        return total as number; 
      }
    
    const totalSavingsPrice = () => {
        const savingsPrices = savings?.map((saving)=>(saving?.expense));
        let total = savingsPrices && savingsPrices.reduce((acc, curr)=> acc + curr, 0);
        return total as number; 
    }

    useEffect(()=>{
        fetchUserData();
        fetchExpenses();
        fetchSavings();
    }, [])

    useEffect(()=>{
        setTotal(totalExpensesPrice() + totalSavingsPrice());
        setRemaining(salary - totalExpensesPrice() - totalSavingsPrice());
    }, [expenses, savings, salary])

    return(
        <context.Provider value={{fetchUserData, 
                                  avatar, 
                                  loading, 
                                  salary, 
                                  totalExpenses, 
                                  remaining, 
                                  expenses: expenses as Expense[], 
                                  fetchExpenses, 
                                  fetchSavings, 
                                  savings: savings as Saving[], 
                                  income}}>
            {props.children}
        </context.Provider>
    )
}