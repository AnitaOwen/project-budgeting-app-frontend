import { Link } from "react-router-dom"

const Transactions = ({ transactions }) => {
    if(transactions.length === 0){
        return null
    } 
    // const total = transactions.reduce((acc, current) => {
    //     acc += current.amount
    //     // console.log(acc)
    //     return acc
    // }, 0)

    
  return (
    <div>
        <div>
            {/* <h3>Account Total: ${total}</h3> */}
            <h2>Transactions</h2>
        </div>

        {transactions.map(({ id, date, itemName, amount }) => (
            <div key={id}>
                <div>{date}</div>
                <Link to={`/${id}`}>
                    <div>{itemName}</div>
                </Link>
                <div>${amount}</div>
                <hr />
            </div>
        ))}
    </div>
  )
}

export default Transactions