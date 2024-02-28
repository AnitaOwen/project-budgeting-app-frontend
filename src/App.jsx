import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import Transactions from "./Transactions";
import TransactionDetails from "./TransactionDetails";
import NavBar from "./NavBar";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

const App = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch("http://localhost:3003/transactions")
    .then((res) => res.json())
    .then((data) => setTransactions(data.transactions))
  }, [])
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
        <Transactions 
        transactions={transactions}
        setTransactions={setTransactions}/>
        } />

        <Route path="/:id" element={
          <TransactionDetails />
        }/>
        <Route path="/new" element={
          <CreateForm 
          setTransactions={setTransactions}/>
        }/>
        <Route path="/edit/:id" element={
          <EditForm />
        } />
      </Routes>
    </div>
  )
}

export default App
