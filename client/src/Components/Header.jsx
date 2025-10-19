import { UserContext } from "../Contexts/UserContext"
import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import AnimatedThemeToggle from "./AnimatedThemeToggle"

export default function Header() {
    const LoggedData = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const headerRef = useRef(null);
    const userDropdownRef = useRef(null);

    function logout() {
        localStorage.removeItem("nutrify-user");
        LoggedData.setLoggedUser(null);
        navigate("/login");
    }

    function toggleUserDropdown() {
        setIsUserDropdownOpen(!isUserDropdownOpen);
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
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
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
                
                {/* User Profile Dropdown */}
                <div className="user-profile-container" ref={userDropdownRef}>
                    <button 
                        className="user-profile-btn" 
                        onClick={toggleUserDropdown}
                        aria-label="User profile menu"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isUserDropdownOpen && (
                        <div className="user-dropdown">
                            <div className="user-dropdown-header">
                                <div className="user-avatar">
                                    {LoggedData.loggedUser.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-info">
                                    <p className="user-name">{LoggedData.loggedUser.name}</p>
                                    <p className="user-email">{LoggedData.loggedUser.email}</p>
                                </div>
                            </div>
                            <div className="user-dropdown-divider"></div>
                            <button className="user-dropdown-item logout-item" onClick={logout}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="18" 
                                    height="18" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}