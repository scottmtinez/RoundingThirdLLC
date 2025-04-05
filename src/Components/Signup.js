import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./FirebaseConfig";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import logo from '../images/Logo.png';

function SignUp() {
    // States
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [position, setPosition] = useState("User");
        const [signupEmail, setSignupEmail] = useState('');
        const [signupPassword, setSignupPassword] = useState('');
        const navigate = useNavigate();

    // Sign-up function
        const handleSignUp = async (e) => {
            e.preventDefault();
            try {
                // Send the signup data to Firestore (accountRequests collection)
                    const docRef = await addDoc(collection(db, 'accountRequests'), {
                        email: signupEmail,
                        password: signupPassword, 
                        status: 'pending', 
                    });

                alert('Account request submitted! Please check in the next few days if your account has been accepted.'); 
                setSignupEmail('');
                setSignupPassword('');
            } catch (error) {
                alert("Signup Failed: " + error.message);
            }
        };

    return (
        <div className="Signup-auth-container">
            <h1 className="Signup-h2">
                <img src={logo} alt="Company Logo" className="Dashboard-logo" />
            </h1>

            <form className='Signup-form' onSubmit={handleSignUp}>
                <h1 className="Signup-h1"><i className="bi bi-person-vcard-fill">Sign Up</i></h1>
                <input
                    className="Account-input"
                    type="email"
                    placeholder="Email..."
                    className="Signup-input"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                />
                <input
                    className="Account-input"
                    type="password"
                    placeholder="Password..."
                    className="Signup-input"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                />
                <button className='Signup-button' type="submit">Sign Up</button>
                <p className="Signup-switch-form">Already have an account? <a href="/login" className="Signup-switch-form-link">Login</a></p>
            </form>
        </div>
    );
}

export default SignUp;
