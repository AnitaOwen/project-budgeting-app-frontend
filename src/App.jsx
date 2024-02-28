import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom"
import Transactions from "./Transactions";
import TransactionDetails from "./TransactionDetails";

const App = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch("http://localhost:3003/transactions")
    .then((res) => res.json())
    .then((data) => setTransactions(data.transactions))
  }, [])
  
  return (
    <div>
      <Routes>
        <Route path="/" element={
        <Transactions 
        transactions={transactions}/>
        } />

        <Route path="/:id" element={
          <TransactionDetails />
        }/>
        {/* <Route /> */}
        {/* <Route /> */}
      </Routes>
    </div>
  )
}

export default App
