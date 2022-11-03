import React, { useReducer, useContext, useEffect } from "react"
import Modal from "../../UI/Modal"
import "./AddExpense.css"
import Input from "../../UI/Input"
import Select from "react-select"
import * as api from "../../../api"
import { ExpensesContext } from '../../../store/ExpensesProvider'; 
import { formatDate } from '../ExpensesTable'
import { MODE } from "../../../App"


const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const AddExpense = ({ closeModal, mode, selectedRecord }) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const expensesCtx = useContext(ExpensesContext);
  console.log(selectedRecord, formData)


  useEffect(() => {
    if(selectedRecord){
      Object.keys(selectedRecord).forEach(key => {
        if(key !== '_id'){
          setFormData({
            name: key,
            value: selectedRecord[key]
          })
        }
      })
    }
  },[selectedRecord])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(mode === MODE.Add){
        await api.createExpense(formData)
        expensesCtx.creatExpense(formData);
      }
      else{
        console.log({formData})
        await api.updateExpense(selectedRecord._id, formData);
        expensesCtx.updateExpense(selectedRecord._id, formData);
      }
    } catch (err) {
      console.error(err.message)
    }
    
    closeModal()
  }

  const handleChange = (e, col) => {
    setFormData({
      name: col ? col : e.target.name,
      value: col ? e.value : e.target.value,
    })
  }

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Date</p>
            <Input name="date" type="date"
             value={formData['date']  ? formatDate(formData.date) : ''} 
             handleChange={handleChange} />
          </label>
          <label>
            <p>Name</p>
            <Select
              name="name"
              options={names}
              value={formData['name'] ? {value: formData.name, label: formData.name} : ''}
              onChange={(e) => handleChange(e, "name")}
            />
          </label>
          <label>
            <p>Type</p>
            <Select
              name="type"
              options={types}
              value={formData['type'] ? {value: formData.type, label: formData.type} : ''}
              onChange={(e) => handleChange(e, "type")}
            />
          </label>
          <label>
            <p>Description</p>
            <Input
              name="description"
              type="text"
              value={formData['description'] ? formData.description : ''}
              handleChange={handleChange}
            />
          </label>
          <label>
            <p>Place</p>
            <Input name="place" type="text" 
            value={formData['place'] ? formData.place : ''} 
            handleChange={handleChange} />
          </label>
          <label>
            <p>Cost</p>
            <Input name="cost" type="number" 
            value={formData['cost'] ? Number(formData.cost) : ''} 
            handleChange={handleChange} />
          </label>
          <label>
            <p>Method</p>
            <Select
              value={formData['method'] ? {value: formData.method, label: formData.method} : ''}
              name="method"
              options={methods}
              onChange={(e) => handleChange(e, "method")}
            />
          </label>
          <button type="submit" className="submit">
            {mode === MODE.Add ? 'Add' : 'Edit'}
          </button>
        </fieldset>
      </form>
    </Modal>
  )
}

export default AddExpense

const names = [
  { value: "Almog", label: "Almog" },
  { value: "Noy", label: "Noy" },
  { value: "Almog & Noy", label: "Almog & Noy" },
]
const types = [
  { value: "Food", label: "Food" },
  { value: "Shopping", label: "Shopping" },
  { value: "Cars", label: "Cars" },
  { value: "Hang Out", label: "Hang Out" },
  { value: "Fixed Costs", label: "Fixed Costs" },
  { value: "Home Costs", label: "Home Costs" },
  { value: "Donations", label: "Donations" },
  { value: "Learning", label: "Learning" },
  { value: "Gits", label: "Gits" },
  { value: "Medical", label: "Medical" },
  { value: "Cosmetics", label: "Cosmetics" },
  { value: "other", label: "other" },
]
const methods = [
  { value: "Credit", label: "Credit" },
  { value: "Cibus", label: "Cibus" },
  { value: "Chuck", label: "Chuck" },
  { value: "Bit", label: "Bit" },
  { value: "Cash", label: "Cash" },
  { value: "Direct Debit", label: "Direct Debit" },
]
