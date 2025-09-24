import { UserContext } from "../Contexts/UserContext"
import { useContext } from "react"
import { Navigate, Link } from "react-router-dom"

export default function Header() {
    const LoggedData = useContext(UserContext);

    function logout() {
        localStorage.removeItem("nutrify-user");
        LoggedData.setLoggedUser(null);
        Navigate("/login")

    }

    return (
        <div className="header">

            <button className="btn">Home</button>

            <button className="btn"><Link to='/demo'>Demo</Link></button>

            <button className="btn" onClick={logout}>Logout</button>



        </div>
    )
}