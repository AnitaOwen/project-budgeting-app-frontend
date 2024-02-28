import { useState }from 'react'
import { useNavigate } from "react-router-dom";

const CreateForm = ({ setTransactions }) => {
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState({
        "itemName": "",
        "amount": 0,
        "date": "",
        "from": "",
        "category": ""
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
                setTransaction({
                    "itemName": "",
                    "amount": 0,
                    "date": "",
                    "from": "",
                    "category": ""
                })
        }
        })
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
        </form>
    </div>
  )
}

export default CreateForm