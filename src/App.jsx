import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import Transactions from "./Transactions";
import TransactionDetails from "./TransactionDetails";
import NavBar from "./NavBar";

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
