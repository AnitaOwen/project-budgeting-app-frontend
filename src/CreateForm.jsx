import { useState }from 'react'
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_API_URL;

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

        fetch(`${URL}`, options)
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
    <div className="create-form-wrapper">
        <h2>Add a Transaction</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">
                    Date:
                </label>
                <input 
                    onChange={handleChange}
                    type="date"
                    id="date"
                    name="date"
                    value={transaction.date} />
            </div>

            <div>
                <label htmlFor="itemName">
                    Name:
                </label>
                <input 
                    onChange={handleChange}
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={transaction.itemName} />
            </div>

            <div>
                <label htmlFor="from">
                    To/From:
                </label>
                <input 
                    onChange={handleChange}
                    type="text"
                    id="from"
                    name="from"
                    value={transaction.from} />
            </div>

            <div>
                <label htmlFor="amount">
                    Amount: $
                </label>
                <input 
                    onChange={handleChange}
                    type="number"
                    id="amount"
                    name="amount"
                    value={transaction.amount} />
            </div>

            <div>
                <label htmlFor="transactionType">
                    
                </label>
                <select
                    onChange={handleChange}
                    id="transactionType" 
                    name="transactionType"
                    value={transaction.transactionType}
                    >
                    <option value="">Select a Transaction Type</option>
                    <option value="Withdrawal">Withdrawal</option>
                    <option value="Deposit">Deposit</option>
                </select>
            </div>

            <div>
                <label htmlFor="category">
          
                </label>
                <select
                    onChange={handleChange}
                    id="category" 
                    name="category"
                    value={transaction.category}
                    >
                    <option value="">Select A Category</option>
                    <option value="Income">Income</option>
                    <option value="Housing">Housing</option>
                    <option value="Food">Food</option>
                    <option value="Savings">Savings</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Personal">Personal</option>
                    <option value="Gifts">Gifts</option>
                </select>
            </div>
            <div>
                <button>SUBMIT</button>
                <button onClick={handleCancel} >CANCEL</button>
            </div>
        </form>
    </div>
  )
}

export default CreateForm