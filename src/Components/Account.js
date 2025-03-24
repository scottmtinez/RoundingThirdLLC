import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './FirebaseConfig'; 
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Account.css';
import Dashboard from './Dashboard';

function Account() {
    // States
        const [user, setUser] = useState(null);
        const [loginEmail, setLoginEmail] = useState('');
        const [loginPassword, setLoginPassword] = useState('');
        const [signupEmail, setSignupEmail] = useState('');
        const [signupPassword, setSignupPassword] = useState('');
        const [isLogin, setIsLogin] = useState(true);
        const navigate = useNavigate();

    // Check if a user is logged in
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    // Login function
        const handleLogin = async (e) => {
            e.preventDefault();
            try {
                await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
                navigate('/account'); 

            } catch (error) {
                alert("Login Failed: " + error.message);
            }
        };

    // Signup function to send data to Firestore
        const handleSignup = async (e) => {
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

    // Logout function
        const handleLogout = () => {
            auth.signOut();
            navigate('/'); 
        };

        return (
            <div className="Account-container">
                {user ? (
                    <div className="logged-in">
                        <button className="Account-button-logout" onClick={handleLogout}>Logout</button>
                        <h1>Welcome, {user.email}</h1>
                        <Dashboard />
                    </div>
                ) : (
                    <>
                        {/* Login Form */}
                        {isLogin ? (
                            <form className="Account-login-form" onSubmit={handleLogin}>
                                <h1 className="Account-h1"><i className="bi bi-person-vcard-fill">Login</i></h1>
                                <input
                                    className="Account-input"
                                    type="email"
                                    placeholder="Email..."
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <input
                                    className="Account-input"
                                    type="password"
                                    placeholder="Password..."
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <button className="Account-button" type="submit">Login</button>
                                <p className="switch-form">
                                    Don't have an account? 
                                    <a href="#" className="switch-form-link" onClick={() => setIsLogin(false)}>
                                        Sign Up
                                    </a>
                                </p>
                            </form>
                        ) : (
                            /* Signup Form */
                            <form className="Account-signup-form" onSubmit={handleSignup}>
                                <h2 className="Account-h2"><i className="bi bi-person-vcard-fill">Sign Up</i></h2>
                                <input
                                    className="Account-input"
                                    type="email"
                                    placeholder="Email..."
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                                <input
                                    className="Account-input"
                                    type="password"
                                    placeholder="Password..."
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                />
                                <button className="Account-button" type="submit">Sign Up</button>
                                <p className="switch-form">
                                    Already have an account? 
                                    <a href="#" className="switch-form-link" onClick={() => setIsLogin(true)}>
                                        Login
                                    </a>
                                </p>
                            </form>
                        )}
                    </>
                )}
            </div>
        );
    }

export default Account;
