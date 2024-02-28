import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TransactionDetails = () => {
    const { id } = useParams()
    const [transactionDetail, setTransactionDetail] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3003/transactions/${id}`)
        .then((res) => res.json())
        .then((data) => setTransactionDetail(data.transaction))
    }, [id]);

    if(transactionDetail.length === 0) return null

    const { itemName, amount, date, from, category } = transactionDetail
  return (
    <div>
        <h2>Name: {itemName}</h2>
        <p>Amount: {amount}</p>
        <p>Date: {date}</p>
        <p>From: {from}</p>
        <p>Category: {category}</p>
        <Link to={'/'}>Back</Link>
    </div>
  )
}

export default TransactionDetails