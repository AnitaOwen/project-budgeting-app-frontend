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

    const { itemName, amount, date, from, category } = transactionDetail
  return (
    <div>
        <h3>Name: {itemName}</h3>
        <p>Amount: ${amount}</p>
        <p>Date: {date}</p>
        <p>From: {from}</p>
        <p>Category: {category}</p>
        <Link to={`/edit/${id}`}>
            <button>Edit Details</button>
        </Link>
        <button onClick={() => handleDelete(id)}>
                    Delete
                </button>
        <div>
            <Link to={'/'}>Back</Link>
        </div>
    </div>
  )
}

export default TransactionDetails