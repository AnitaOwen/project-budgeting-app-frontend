import { Link } from "react-router-dom"

const NavBar = ({ transactions }) => {

  const total = transactions.reduce((acc, current) => {
    acc += current.amount
    // console.log(acc)
    return acc
}, 0)

  return (
    <div>
        <h1>BUDGETR</h1>
        <h3>Account Total: ${total}</h3>
        <Link to="/new">
            <button>Create Transaction</button>
        </Link>

    </div>
  )
}

export default NavBar