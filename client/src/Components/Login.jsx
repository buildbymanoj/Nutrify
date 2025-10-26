import { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const { setLoggedUser } = useContext(UserContext);

    const [userCreds, setuserCreds] = useState({
        email: '',
        password: ''
    })

    const [Message, setMessage] = useState({
        type: 'invisible-msg',
        text: 'dummy'
    })

    const navigate = useNavigate();

    function handleInput(event) {
        setuserCreds((prevdata) => {
            return { ...prevdata, [event.target.name]: event.target.value }

        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        //   console.log(userCreds)

        fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));
                if (response.ok) {
                    setMessage({ type: "Success", text: data.message || 'Login Successful! Redirecting...' });
                    // store and navigate after showing success message
                    if (data.token !== undefined) {
                        localStorage.setItem("nutrify-user", JSON.stringify(data));
                        setLoggedUser(data);
                        // Add delay before navigation to show success message
                        setTimeout(() => {
                            navigate('/track');
                        }, 1500); // 1.5 seconds delay
                    }
                } else {
                    // Map known status codes to messages, otherwise use server message
                    if (response.status === 404) {
                        setMessage({ type: "error", text: data.message || 'Username or email not exist' });
                    } else if (response.status === 403) {
                        setMessage({ type: "error", text: data.message || 'Incorrect password' });
                    } else {
                        setMessage({ type: "error", text: data.message || `Login failed (${response.status})` });
                    }
                }

                // For error messages only, clear after 5 seconds
                // Success messages will be cleared by navigation after 1.5 seconds
                if (!response.ok) {
                    setTimeout(() => {
                        setMessage({ type: "invisible-msg", text: "dummy" })
                    }, 5000);
                }
            })
            .catch((err) => {
                // console.log(err);
                setMessage({ type: "error", text: "Network error. Please try again." });
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy" })
                }, 5000);
            });
    }
    return (


        <section className="container auth-container">
            <div className="login-div">

                <form className="form" onSubmit={handleSubmit}>
                    <h1>Lets' get Fit</h1>
                    <input type="email" name="email" placeholder="Enter email" required onChange={handleInput} value={userCreds.email}
                        className="inp" />
                    <input type="password" name="password" placeholder="Enter password" required onChange={handleInput} value={userCreds.password}
                        className="inp" />
                    <button className="btn">LOGIN</button>
                    <p>Not Registered Yet? <Link to='/register'>Register</Link></p>
                    <p className={Message.type}>{Message.text}</p>
                </form>

            </div>

        </section>
    )
}

export default Login;