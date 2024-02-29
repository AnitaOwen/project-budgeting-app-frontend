import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TransactionDetails = ({ setTransactions }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [transactionDetail, setTransactionDetail] = useState([])

    function handleDelete(id){
        const options = {
            method: "DELETE",
        }
        fetch(`http://localhost:3003/transactions/${id}`, options)
        .then((res) => res.json())
        .then((data) => (setTransactions(data.transactions)))
        .then(navigate("/"))
    }

    useEffect(() => {
        fetch(`http://localhost:3003/transactions/${id}`)
        .then((res) => res.json())
        .then((data) => setTransactionDetail(data.transaction))
    }, [id]);

    if(transactionDetail.length === 0) return null

    const { itemName, amount, date, from, category, transactionType } = transactionDetail

    const options = { month: "short", day: "2-digit", year: "numeric" }
  return (
    <div className="details-wrapper">
        <h3>{itemName} <span className={amount > 0 ? "positive-text" : "negative-text"}> ${amount}</span></h3>
        <p>Date: {new Date(date).toLocaleDateString("en-US", options)}</p>
        <p>From: {from}</p>
        <p>Category: {category}</p>
        <p>Type: {transactionType}</p>
        <Link to={`/edit/${id}`}>
            <button>EDIT DETAILS</button>
        </Link>
        <button onClick={() => handleDelete(id)}>
                    DELETE
                </button>
        <div>
            <Link to={'/'}>GO BACK</Link>
        </div>
    </div>
  )
}

export default TransactionDetails