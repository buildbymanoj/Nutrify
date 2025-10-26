import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
function Register() {
    const { setLoggedUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [UserDetails, SetUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        age: ''
    })

    const [Message, setMessage] = useState({
        type: 'invisible-msg',
        text: 'dummy'
    })



    function handleInput(event) {
        SetUserDetails((prevdata) => {
            return { ...prevdata, [event.target.name]: event.target.value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(UserDetails);


        const creds = { email: UserDetails.email, password: UserDetails.password };

        fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: "POST",
            body: JSON.stringify(UserDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));
                if (response.ok) {
                    // Set success message
                    setMessage({ type: "Success", text: data.message || 'Registered successfully! Redirecting...' });
                    
                    const finalizeLogin = (userData) => {
                        localStorage.setItem("nutrify-user", JSON.stringify(userData));
                        setLoggedUser(userData);
                        setTimeout(() => {
                            navigate('/track');
                        }, 1000);
                    };

                    if (data.token) {
                        finalizeLogin(data);
                    } else {
                        // Auto-login if register response doesn't include auth payload
                        fetch(`${import.meta.env.VITE_API_URL}/login`, {
                            method: "POST",
                            body: JSON.stringify(creds),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(async (loginResponse) => {
                                const loginData = await loginResponse.json().catch(() => ({}));
                                if (loginResponse.ok && loginData.token) {
                                    finalizeLogin(loginData);
                                } else {
                                    setMessage({ type: "error", text: loginData.message || 'Registration succeeded but auto-login failed. Please login manually.' });
                                }
                            })
                            .catch(() => {
                                setMessage({ type: "error", text: 'Registration succeeded but auto-login failed. Please login manually.' });
                            });
                    }
                    
                    // Reset form fields after attempting auto-login
                    SetUserDetails({ name: '', email: '', password: '', age: '' });
                } else {
                    // show server-provided message when available, otherwise fallback
                    setMessage({ type: "error", text: data.message || `Registration failed (${response.status})` });
                }

                // hide message after a short delay
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy" })
                }, 5000);
            })
            .catch((err) => {
                // console.log(err);
                setMessage({ type: "error", text: "Network error. Please try again." });
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy" })
                }, 5000);
            })
    }


    return (




        <section className="container auth-container">

            <div className='login-div'>

            <form className="form" onSubmit={handleSubmit}>
                <h1>Lets' get Fit</h1>
                <input type="text" name="name" placeholder="Enter name" onChange={handleInput} value={UserDetails.name} required
                    className="inp" />

                <input type="email" name="email" placeholder="Enter email" onChange={handleInput} value={UserDetails.email} required
                    className="inp" />

                <input type="password" name="password" placeholder="Enter password" onChange={handleInput} value={UserDetails.password} required maxLength={8}
                    className="inp" />

                <input type="number" name="age" placeholder="Enter age" onChange={handleInput} value={UserDetails.age} required max={100} min={10}
                    className="inp" />
                <button className="btn">JOIN</button>
                <p>Already Registered? <Link to='/login'>Login</Link></p>
                <p className={Message.type}>{Message.text}</p>
            </form>

            </div>


        </section>
    )
}

export default Register;