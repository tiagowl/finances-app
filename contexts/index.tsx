import React, { ReactNode, useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { Saving } from "../types/saving";
import supabase from "../services/supabase";

export interface ContextData{
    loading: boolean;
    salary: number;
    totalExpenses: number;
    remaining: number;
    fetchExpenses: ()=>Promise<void>;
    expenses: Expense[];
    savings: Saving[];
    fetchSavings: () => Promise<void>
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

    const fetchUserData = async () => {
        setLoading(true);
        let { data: users, error } = await supabase.from('users').select('*').range(0,0);
        if(users){
          setSalary(users[0]?.salary as number);
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
        <context.Provider value={{loading, salary, totalExpenses, remaining, expenses: expenses as Expense[], fetchExpenses, fetchSavings, savings: savings as Saving[]}}>
            {props.children}
        </context.Provider>
    )
}