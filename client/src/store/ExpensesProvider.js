import React, { useCallback, useEffect, useReducer } from "react";
import * as api from '../api';

export const ExpensesContext = React.createContext({
  expenses: [],
  getExpenses: (data) => {},
  creatExpense: (expense) => {},
  updateExpense: (id, expense) => {},
  deleteExpense: (id) => {}
})


const expensesReducer = (expenses = [], action) => {
  switch (action.type) {
    case 'SET':
        return [...action.payload]
    case "CREATE":
      return [...expenses, action.payload]
    case "UPDATE": 
      const index = expenses.findIndex(ex => ex._id === action.payload.id);
      expenses[index] = action.payload.expense;
      return [...expenses]
    case "DElETE":
      return expenses.filter((exp) => exp._id !== action.payload)
    default:
      return expenses
  }
}

export const ExpensesProvider = ({ children }) => {
  const [expenses, dispatchExpenseAction] = useReducer(expensesReducer, []);

    const getExpenses = useCallback(async (data) => {
      try{
        const { data } = await api.getAllExpenses();
        dispatchExpenseAction({ type: 'SET', payload: data.expenses});
      } catch (err) {
        console.error(err.message);
      }
    },[dispatchExpenseAction])


  const creatExpense = (expense) => {
    dispatchExpenseAction({ type: 'CREATE', payload: expense});
  }

  const updateExpense = (id, expense) => {
    dispatchExpenseAction({ type: 'UPDATE', payload: {id, expense}});
  }

  const deleteExpense = (id) => {
    dispatchExpenseAction({ type: 'DELETE', payload: id });
  }

  const expensesContext = {
      expenses,
      getExpenses,
      creatExpense,
      updateExpense,
      deleteExpense
  }

  return (
      <ExpensesContext.Provider value={expensesContext}>{children}</ExpensesContext.Provider>
  )

}
