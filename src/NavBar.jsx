import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
        <h1>BUDGETR</h1>
        <Link to="/new">
            <button>Create Transaction</button>
        </Link>
    </div>
  )
}

export default NavBar