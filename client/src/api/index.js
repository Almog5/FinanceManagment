import axios from "axios"
const URL = "http://localhost:3003/api/v1/expenses"

export const getAllExpenses = () => axios.get(URL)

export const createExpense = (expense) => axios.post(URL, expense)

export const updateExpense = (id, expense) => axios.patch(`${URL}/${id}`, expense)

export const deleteExpense = (id) => axios.delete(`${URL}/${id}`)
