import React, { ReactNode, useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { Saving } from "../types/saving";
import api from "../services/api";

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

    const fetchUserData = async () => {
        setLoading(true);
        const response = await api.get("/users?select=*");
        if(response?.data){
          setSalary(response?.data[0]?.salary as number);
          setIncome(response?.data[0]?.income as number);
          setAvatar(response?.data[0]?.avatar_url)
          setLoading(false);
        }
    }

    const fetchExpenses = async () =>{
        setLoading(true);
        const response = await api.get("/expenses?select=*");
        if(response?.data){
            setLoading(false);
            setExpenses(response?.data as Expense[]);
        }
    }
    
    const fetchSavings = async() => {
        setLoading(true)
        const response = await api.get("/savings?select=*");
        if(response?.data){
            setSavings(response?.data as Saving[]);
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