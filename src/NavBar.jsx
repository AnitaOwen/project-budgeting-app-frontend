import { Link } from "react-router-dom"

const NavBar = ({ transactions }) => {

  const total = transactions.reduce((acc, current) => acc += current.amount, 0)

  return (
    <div className="nav-wrapper">
      <div className="header-left">
        <h1>BUDGETR</h1>
      </div>
      <div className="header-right">
        <h3>Account Total: <span className={total > 100 ? "green-text" : total < 0 ? "red-text" : "yellow-text"}>${total}</span></h3>
        <Link to="/new">
            <button>NEW TRANSACTION</button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar