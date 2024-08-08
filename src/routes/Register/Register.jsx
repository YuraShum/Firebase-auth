import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { createUser } from "../../firebase";
import { startSession } from "../../session";

import './Register.scss'
export default function Register() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !repeatPassword) {
            setError("Please fill out all the fields.");
            return;
        }
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        // TODO: send the register request
        console.log("Registering...");

        try {
            let registerResponse = await createUser(email, password);
            startSession(registerResponse.user);
            navigate("/user");
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    };

    return (
        <div className="register-conteiner">
            <h1 className="register-heading">Register</h1>
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
                <input
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <div className="login-link">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    )
}