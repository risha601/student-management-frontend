import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function loginUser() {

        const response = await fetch("http://localhost:5000/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                password

            })

        });

        const data = await response.json();

        if (response.ok) {

            // Save JWT Token
            localStorage.setItem("token", data.token);
            //save role 
            localStorage.setItem("role", data.role);

            alert("Login Successful!");

            // Go to Student Page
            navigate("/students");

        }

        else {

            alert(data.message);

        }

    }

    return (

        <div className="students-container">

            <h1>Login</h1>

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
                onClick={loginUser}
            >
                Login
            </button>

            <p style={{ textAlign: "center", marginTop: "15px" }}>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>

    );

}

export default Login;