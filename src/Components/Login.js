import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../images/Logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Login() {
    //States
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

    //Login function
        const handleLogin = async (e) => {
            e.preventDefault();
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/dashboard"); 
            } catch (error) {
                alert("Login failed: " + error.message);
            }
        };

    return (
        <div className="Login-auth-container">
            <h1 className="Login-h2">
                <img src={logo} alt="Company Logo" className="Dashboard-logo" />
            </h1>

            <form className='Login-form' onSubmit={handleLogin}>
                <h1 className="Login-h1"><i className="bi bi-person-vcard-fill">Login</i></h1>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    className="Login-input"
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    className="Login-input"
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button className='Login-button' type="submit">Login</button>
                <p className="Login-switch-form">Don't have an account? <a className='Login-switch-form-link' href="/signup">Sign Up</a></p>
            </form>
        </div>
    );
}

export default Login;
