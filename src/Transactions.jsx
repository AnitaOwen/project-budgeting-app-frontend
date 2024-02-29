import { Link } from "react-router-dom"

const Transactions = ({ transactions }) => {
    if(transactions.length === 0){
        return null
    } 
    const total = transactions.reduce((acc, current) => {
        acc += current.amount
        // console.log(acc)
        return acc
    }, 0)

    
  return (
    <div>
        <div>
            <h2>Transactions</h2>
            <div>Account Total: ${total}</div>

        </div>

        {transactions.map(({ id, date, itemName, amount }) => (
            <div key={id}>
                <div>{date}</div>
                <div>{itemName}</div>
                <div>${amount}</div>
                <Link to={`/${id}`}>
                    <button>Details</button>
                </Link>
                <hr />
            </div>
        ))}
    </div>
  )
}

export default Transactions