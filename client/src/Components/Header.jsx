import { UserContext } from "../Contexts/UserContext"
import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import AnimatedThemeToggle from "./AnimatedThemeToggle"

export default function Header() {
    const LoggedData = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    function logout() {
        localStorage.removeItem("nutrify-user");
        LoggedData.setLoggedUser(null);
        navigate("/login");
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="header" ref={headerRef}>
            {/* Hamburger Menu Button */}
            <button 
                className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="header-links">
                <Link to="/track"><button className="head-btn">Track</button></Link>
                <Link to="/diet"><button className="head-btn">Diet</button></Link>
                <Link to="/calculator"><button className="head-btn">Calculator</button></Link>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-nav-menu ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/track" onClick={closeMenu}>
                    <button className="head-btn">Track</button>
                </Link>
                <Link to="/diet" onClick={closeMenu}>
                    <button className="head-btn">Diet</button>
                </Link>
                <Link to="/calculator" onClick={closeMenu}>
                    <button className="head-btn">Calculator</button>
                </Link>
            </div>
            
            <div className="header-actions">
                <AnimatedThemeToggle />
                <button className="head-btn logout-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}