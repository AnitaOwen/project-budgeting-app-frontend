import { Link } from "react-router-dom"

const Transactions = ({ transactions }) => {
    if(transactions.length === 0) return null

  return (
    <div>
        <h2>Transactions</h2>
        {transactions.map(({ id, date, itemName, amount }) => (
            <div key={id}>
                <div>{date}</div>
                <div>{itemName}</div>
                <div>${amount}</div>
                <hr />
            </div>
        ))}
    </div>
  )
}

export default Transactions