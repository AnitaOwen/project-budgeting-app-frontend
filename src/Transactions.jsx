import { Link } from "react-router-dom"

const Transactions = ({ transactions }) => {
    if(transactions.length === 0){
        return null
    } 

    const options = { month: "short", day: "2-digit" }

    transactions.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB - dateA
    })

  return (
    <div className ="table-wrapper">
        <div className="transactions-header">
            {/* <h3>Account Total: ${total}</h3> */}
            <h2>Transactions</h2>
        </div>
        <table>
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                </tr>
            </thead>
            <tbody>
            {transactions.map(({ id, date, itemName, amount }) => (
            <tr key={id} className={amount > 0 ? "positive" : "negative"}>
                <td>{new Date(date).toLocaleDateString("en-US", options)}</td>
                <td>
                <Link to={`/${id}`}>{itemName}</Link>
                </td>
                <td>${amount}</td>
            </tr>
        ))}
            </tbody>
        </table>
    </div>
  )
}

export default Transactions