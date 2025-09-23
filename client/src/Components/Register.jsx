import { useState } from 'react';
import { Link } from 'react-router-dom'
function Register() {

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
        console.log(UserDetails);


        fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify(UserDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) =>
                response.json())
            .then((data) => {
                setMessage({ type: "Success", text: data.message })
                //  console.log(UserDetails)

                SetUserDetails({
                    name: '',
                    email: '',
                    password: '',
                    age: ''

                })

                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy" })
                }, 5000);

            })
            .catch((err) => {
                console.log(err);

            })
    }


    return (




        <section className="container">

            <form className="form" onSubmit={handleSubmit}>
                <h1>Hit to Fit</h1>
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


        </section>
    )
}

export default Register;