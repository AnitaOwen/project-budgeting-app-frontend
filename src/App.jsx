import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom"
import Transactions from "./Transactions";

const App = () => {
  const [transactions, setTransactions] = useState([])

  
  return (
    <div>
      <Routes>
        <Route path="/" element={
        <Transactions />
        } />

        {/* <Route /> */}
        {/* <Route /> */}
        {/* <Route /> */}
      </Routes>
    </div>
  )
}

export default App
