import React, { useContext } from 'react'
import Modal from '../../UI/Modal'
import { ExpensesContext } from '../../../store/ExpensesProvider';
import './DeleteExpense.css'
import * as api from '../../../api'

const DeleteExpense = ({ selectedRecord, closeModal}) => {
  const expensesCtx = useContext(ExpensesContext);

  const handleDelete = async () => {
    try {
      await api.deleteExpense(selectedRecord._id)
      expensesCtx.deleteExpense(selectedRecord._id)
    } catch (err) {
      console.error(err.message)
    }

    closeModal()
  }

  return (
   <Modal closeModal={closeModal}>
     <div className='delete-modal-content'>
       <h3><b>Are you sure you want to delete this expense ?</b></h3>
       <span><b>Expense:</b> {selectedRecord.description}</span> 
       <span><b>User:</b> {selectedRecord.name}</span>
       <span><b>Place:</b> {selectedRecord.place}</span>
      </div>
      <div className='btn-action'>
        <button className='delete' onClick={handleDelete}>Delete</button>
        <button className='cancle' onClick={closeModal}>cancle</button>
      </div>
   </Modal>
  )
}


export default DeleteExpense
