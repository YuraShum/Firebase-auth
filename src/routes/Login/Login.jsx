import { useState } from "react";


import {startSession} from "../../session";

import './Login.scss'
import { signInUser } from "../../firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {


    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setError("");

        // TODO: Send login request
        console.log("Logging in...");

        try {
            let loginResponse = await signInUser(email, password)
            startSession(loginResponse.user);
            navigate("/user");
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <div className="register-link">
                Don't have an account yet? <a href="/register">Register</a>
            </div>
        </div>
    );
};