import { createContext } from "react";
import axios from 'axios';
import { useState } from "react";
import { useContext } from "react";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{
   
    const [incomes,setIncomes] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [error,setError] = useState([]);

    const addIncome = async(income) => {
        const response = await axios.post(`${BASE_URL}add-income`,income)
        .catch((err)=>{
            setError(err.response.data.message)
        })
        getIncomes()
    }

    const getIncomes = async() => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
        
    }

    const deleteIncome = async(id)=>{
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () =>{
        let totalIncome = 0;
        incomes.forEach((income)=>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const addExpenses = async(expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`,expense)
        .catch((err)=>{
            setError(err.response.data.message)
        })
        getExpenses()
    }

    const getExpenses = async() => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
        
    }

    const deleteExpenses = async(id)=>{
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () =>{
        let totalExpenses = 0;
        expenses.forEach((expense)=>{
            totalExpenses = totalExpenses + expense.amount
        })

        return totalExpenses;
    }
    
    const totalBalance = ()=>{
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () =>{
        const history = [...incomes,...expenses]
        history.sort((a,b) =>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0,4)
    }

    return(
    <GlobalContext.Provider value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpenses,
        getExpenses,
        expenses,
        deleteExpenses,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        }}>
        {children}
    </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext)
}


