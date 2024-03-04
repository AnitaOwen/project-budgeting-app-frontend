import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_API_URL;

const EditForm = ({ setTransactions }) => {
    const { id } = useParams()
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
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
        }
        fetch(`${URL}/${id}`, options)
        .then((res) => res.json())
        .then((data) => setTransactions(data.transactions))
        .then(() => navigate('/'))
    }

    function handleCancel(){
        navigate("/")
    }



    useEffect(() => {
        if(id){
            fetch(`${URL}/${id}`)
            .then((res) => res.json())
            .then((data) => setTransaction(data.transaction))
     
        }
    }, [id])

  return (
    <div className="create-form-wrapper">
        <h2>Edit Transaction</h2>
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
                    Amount $
                </label>
                <input 
                    onChange={handleChange}
                    type="number"
                    id="amount"
                    name="amount"
                    value={transaction.amount < 0 ? transaction.amount.toString().slice(1) : transaction.amount} />
            </div>

            <div>
                <label htmlFor="transactionType">
                    Transaction type:
                </label>
                <select
                    onChange={handleChange}
                    id="transactionType" 
                    name="transactionType"
                    value={transaction.transactionType}
                    >
                    <option value={transaction.transactionType}>{transaction.transactionType}</option>
                    <option value="Withdrawal">Withdrawal</option>
                    <option value="Deposit">Deposit</option>
                </select>
            </div>

            <div>
                <label htmlFor="category">
                    Category:
                </label>
                <select
                    onChange={handleChange}
                    id="category" 
                    name="category"
                    value={transaction.category}
                    >
                    <option value={transaction.category}>{transaction.category}</option>
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

export default EditForm