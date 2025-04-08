import { useState } from "react";
import { signInWithEmailAndPassword, signOut, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../images/Logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // 2FA
    const [otp, setOtp] = useState(""); // OTP
    const [verificationId, setVerificationId] = useState(null);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Sign in with email & password
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!phoneNumber) {
                alert("Please enter your phone number for verification.");
                return;
            }

            setStep(2); // Move to OTP step
            sendOTP(phoneNumber);
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    // Send OTP to phone number
        const sendOTP = async (phone) => {
            try {
                if (!window.recaptchaVerifier) {
                    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                        size: "invisible",
                        callback: (response) => {
                            console.log("Recaptcha verified!");
                        },
                    }, auth);
                }
        
                const appVerifier = window.recaptchaVerifier;
                const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
                setVerificationId(confirmationResult.verificationId);
            } catch (error) {
                alert("Failed to send OTP: " + error.message);
            }
        };    

    // Verify OTP and sign in
    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            await signInWithCredential(auth, credential);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            alert("OTP verification failed: " + error.message);
        }
    };

    return (
        <div className="Login-auth-container">
            <h1 className="Login-h2">
                <img src={logo} alt="Company Logo" className="Dashboard-logo" />
            </h1>

            {step === 1 ? (
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
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={phoneNumber}
                        className="Login-input"
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        required 
                    />
                    
                    <button className='Login-button' type="submit">Login</button>
                    <p className="Login-switch-form">Don't have an account? <a className='Login-switch-form-link' href="/signup">Sign Up</a></p>
                </form>
            ) : (
                <form className='Login-form' onSubmit={verifyOTP}>
                    <h1 className="Login-h1"><i className="bi bi-shield-lock-fill">Enter OTP</i></h1>
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otp} 
                        className="Login-input"
                        onChange={(e) => setOtp(e.target.value)} 
                        required 
                    />
                    <button className='Login-button' type="submit">Verify OTP</button>
                </form>
            )}

            <div id="recaptcha-container"></div>
        </div>
    );
}

export default Login;
