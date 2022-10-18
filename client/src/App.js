import React, { useState } from "react";
import "./App.css";
import ExpensesTable from "./components/Expenses/ExpensesTable";
import AddExpense from "./components/Expenses/AddExpense/AddExpense";
import DeleteExpense from "./components/Expenses/DeleteExpense/DeleteExpense";
import { ExpensesProvider } from './store/ExpensesProvider'

export const MODE ={
  Add: 'ADD',
  Edit: 'EDIT',
  Empty: null
} 

const App = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mode, setMode] = useState(MODE.Empty);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setMode(MODE.Empty);
    setSelectedRecord(null)
  }

  const handleCloseDeleteModal = () => {
    setSelectedRecord(null)
    setIsDeleteModalOpen(false)
  }

  return (
    <ExpensesProvider>
      <div className="app">
        <ExpensesTable setMode={setMode} setSelectedRecord={setSelectedRecord} openAddModal={() => setIsAddModalOpen(true)} openDeleteModal={() => setIsDeleteModalOpen(true)}/>
        {isAddModalOpen && <AddExpense mode={mode} selectedRecord={selectedRecord} closeModal={handleCloseAddModal} />}
        {isDeleteModalOpen && <DeleteExpense selectedRecord={selectedRecord} closeModal={handleCloseDeleteModal} />}
      </div>
    </ExpensesProvider>
  );
};

export default App;
