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

            <Link to="/track"><button className="head-btn">Track</button></Link>
            <Link to="/diet"><button className="head-btn">Diet</button></Link>
            <button className="head-btn" onClick={logout}>Logout</button>



        </div>
    )
}