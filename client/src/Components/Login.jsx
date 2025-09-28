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

        fetch('http://localhost:8000/login', {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then((response) => {
                if (response.status === 404) {
                    setMessage({ type: "error", text: "username or email not exist" })
                }

                else if (response.status === 403) {
                    setMessage({ type: "error", text: "incorrect password" })
                }
                else if (response.status === 200) {
                    return response.json()
                    setMessage({ type: "Success", text: "Login Successful" })

                }



            })
            .then((data) => {

                if (data.token !== undefined) {
                    localStorage.setItem("nutrify-user", JSON.stringify(data))

                    setLoggedUser(data);

                    navigate('/track')


                }

            })
            .catch((err) => {
                console.log(err);

            })

        setTimeout(() => {
            setMessage({ type: "invisible-msg", text: "dummy" })

        }, 5000);
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