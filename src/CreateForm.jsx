import { useState }from 'react'
import { useNavigate } from "react-router-dom";

const CreateForm = ({ setTransactions }) => {
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState({
        "itemName": "",
        "amount": 0,
        "date": "",
        "from": "",
        "category": "",
        "transactionType": "",
    })

    function handleChange(event){
        setTransaction({
            ...transaction,
            [event.target.id]: event.target.value
        })
    }
    function handleSubmit(event){
        event.preventDefault()

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction)
        }

        fetch("http://localhost:3003/transactions", options)
        .then((res) => res.json())
        .then((data) => {
            if(data.message) {
                alert("All inputs must be filled.")
            } else {
                setTransactions(data.transactions)
                navigate("/")
            }
        })
    }

    function handleCancel(){
        navigate("/")
    }


  return (
    <div>
        <h2>Create a transaction</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="itemName">
                    Name:
                    <input 
                    onChange={handleChange}
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={transaction.itemName} />
                </label>
            </div>

            <div>
                <label htmlFor="amount">
                    Amount:
                    <input 
                    onChange={handleChange}
                    type="number"
                    id="amount"
                    name="amount"
                    value={transaction.amount} />
                </label>
            </div>

            <div>
            <label htmlFor="transactionType">
                    Transaction type:
                    <select
                    onChange={handleChange}
                    id="transactionType" 
                    name="transactionType"
                    value={transaction.transactionType}
                    >
                    <option value="">Select One</option>
                    <option value="withdrawal">Withdrawal</option>
                    <option value="deposit">Deposit</option>
                    </select>
                </label>
            </div>

            <div>
                <label htmlFor="date">
                    Date:
                    <input 
                    onChange={handleChange}
                    type="date"
                    id="date"
                    name="date"
                    value={transaction.date} />
                </label>
            </div>

            <div>
                <label htmlFor="from">
                    From:
                    <input 
                    onChange={handleChange}
                    type="text"
                    id="from"
                    name="from"
                    value={transaction.from} />
                </label>
            </div>

            <label htmlFor="category">
                Category:
                <select
                onChange={handleChange}
                id="category" 
                name="category"
                value={transaction.category}
                >
                <option value="">Select One</option>
                <option value="income">Income</option>
                <option value="housing">Housing</option>
                <option value="food">Food</option>
                <option value="savings">Savings</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="personal">Personal</option>
                <option value="gifts">Gifts</option>
                </select>
            </label>

            <div>
                <button>Submit</button>
                <button onClick={handleCancel} >Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default CreateForm