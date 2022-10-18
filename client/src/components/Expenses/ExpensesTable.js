import React, { useContext, useEffect } from "react"
import "./ExpensesTable.css"
import * as api from "../../api"
import { ExpensesContext } from '../../store/ExpensesProvider';
import { MODE } from '../../App';

export const formatDate = (dateTime) => {
  return dateTime.split('T')[0]
}

const ExpensesTable = ({ openAddModal, openDeleteModal,  setMode, setSelectedRecord }) => {
  const { expenses, getExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    // getAllExpenses();
    getExpenses();
  },[getExpenses])

  // const getAllExpenses = useCallback(async () => {
  //   try {
  //       const { data } = await api.getAllExpenses();
  //       expensesCtx.getExpenses(data.expenses);
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // },[expensesCtx])

  const handleAdd = () => {
    setMode(MODE.Add)
    openAddModal()
  }

  const handleEdit = (exp) => {
    setMode(MODE.Edit);
    setSelectedRecord(exp)
    openAddModal()
  }

  const handleDelete = (exp) => {
    setSelectedRecord(exp)
    openDeleteModal()
  }

  return (
    <div>
      <div className="header">
        <h1>Expenses</h1>
        {/* <h1 onClick={getAllExpenses}>Expenses</h1> */}
        <button onClick={handleAdd}>+</button>
      </div>
      {expenses && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Place</th>
              <th>Cost</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => {
              return (
                <tr key={exp._id}>
                  <td>{formatDate(exp.date)}</td>
                  <td>{exp.name}</td>
                  <td>{exp.type}</td>
                  <td>{exp.description}</td>
                  <td>{exp.place}</td>
                  <td>{exp.cost}</td>
                  <td>{exp.method}</td>
                  <td>
                    <span onClick={() => handleEdit(exp)}>Edit</span>&nbsp;&nbsp;
                    <span onClick={() => handleDelete(exp)}>Delete</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ExpensesTable
