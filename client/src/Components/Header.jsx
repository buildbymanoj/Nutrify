import { UserContext } from "../Contexts/UserContext"
import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import AnimatedThemeToggle from "./AnimatedThemeToggle"

export default function Header() {
    const LoggedData = useContext(UserContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("nutrify-user");
        LoggedData.setLoggedUser(null);
        navigate("/login");
    }

    return (
        <div className="header">
            <div className="header-links">
                <Link to="/track"><button className="head-btn">Track</button></Link>
                <Link to="/diet"><button className="head-btn">Diet</button></Link>
                <Link to="/calculator"><button className="head-btn">Calculator</button></Link>
            </div>
            
            <div className="header-actions">
                <AnimatedThemeToggle />
                <button className="head-btn logout-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}