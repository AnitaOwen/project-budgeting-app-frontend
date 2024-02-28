import { Link } from "react-router-dom"

const Transactions = ({ transactions, setTransactions }) => {
    if(transactions.length === 0) return null

    function handleDelete(id){
        const options = {
            method: "DELETE",
        }
        fetch(`http://localhost:3003/transactions/${id}`, options)
        .then((res) => res.json())
        .then((data) => (setTransactions(data.transactions)))
    }

  return (
    <div>
        <h2>Transactions</h2>
        {transactions.map(({ id, date, itemName, amount }) => (
            <div key={id}>
                <div>{date}</div>
                <div>{itemName}</div>
                <div>${amount}</div>
                <Link to={`/${id}`}>
                    <button>Details</button>
                </Link>
                <button onClick={() => handleDelete(id)}>
                    Delete
                </button>
                <hr />
            </div>
        ))}
    </div>
  )
}

export default Transactions