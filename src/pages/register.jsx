import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function registerUser() {

        const response = await fetch("http://localhost:5000/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,

                email: email,

                password: password

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful!");

            setName("");

            setEmail("");

            setPassword("");

            // Go to Login Page
            navigate("/");

        }

        else {

            alert(data.message);

        }

    }

    return (

        <div className="students-container">

            <h1>Register</h1>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="add-btn"
                onClick={registerUser}
            >
                Register
            </button>

        </div>

    );

}

export default Register;