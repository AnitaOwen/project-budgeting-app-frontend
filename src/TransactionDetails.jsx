import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_BASE_API_URL;

const TransactionDetails = ({ setTransactions }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [transactionDetail, setTransactionDetail] = useState([])

    function handleDelete(id){
        const options = {
            method: "DELETE",
        }
        fetch(`${URL}/${id}`, options)
        .then((res) => res.json())
        .then((data) => (setTransactions(data.transactions)))
        .then(navigate("/"))
    }

    useEffect(() => {
        fetch(`${URL}/${id}`)
        .then((res) => res.json())
        .then((data) => setTransactionDetail(data.transaction))
    }, [id]);

    if(transactionDetail.length === 0) return null

    const { itemName, amount, date, from, category, transactionType } = transactionDetail

    function formattedDate(date) {
        // Split the input date string into an array of parts using the "-" delimiter
        const parts = date.split("-");
      
        // Create a new Date object using the parts, adjusting the month value by -1 since months are zero-based in JavaScript Date objects
        const transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
      
        // Format the Date object using the toLocaleDateString method with the specified options
        return transactionDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }

  return (
    <div className="details-wrapper">
        <h3>{itemName} <span className={amount > 0 ? "positive-text" : "negative-text"}> ${amount}</span></h3>
        <p>Date: {formattedDate(date)}</p>
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