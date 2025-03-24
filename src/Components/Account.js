import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './FirebaseConfig'; // Import Firestore db
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import './Account.css';
import Dashboard from './Dashboard';

function Account() {
    // States
        const [user, setUser] = useState(null);
        const [loginEmail, setLoginEmail] = useState('');
        const [loginPassword, setLoginPassword] = useState('');
        const [signupEmail, setSignupEmail] = useState('');
        const [signupPassword, setSignupPassword] = useState('');
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
                navigate('/account'); // Redirect to dashboard after successful login
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
                    password: signupPassword, // You may want to store this hashed for security purposes
                    status: 'pending', // Set the status as 'pending' when the request is created
                });

                alert('Account request submitted! Please check in the next few days if your account has been accepted.'); // Notify the user
                setSignupEmail('');
                setSignupPassword('');
            } catch (error) {
                alert("Signup Failed: " + error.message);
            }
        };

    // Logout function
        const handleLogout = () => {
            auth.signOut();
            navigate('/'); // Redirect to home after logout
        };

    return (
        <div className="Account-container">
            {user ? (
                <div className="logged-in">
                    <h1>Welcome, {user.email}</h1>
                    <button className="Account-button" onClick={handleLogout}>Logout</button>
                    <Dashboard />
                </div>
            ) : (
                <>
                    {/* Login Form */}
                    <h1 className='Account-h1'>Account</h1>
                    <form className='Account-login-form' onSubmit={handleLogin}>
                        <input className='Account-input' type='email' placeholder='Email...' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                        <input className='Account-input' type='password' placeholder='Password...' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                        <button className='Account-button' type='submit'>Login</button>
                    </form>

                    {/* Signup Form */}
                    <form className='Account-signup-form' onSubmit={handleSignup}>
                        <h2 className='Account-h2'>Sign Up</h2>
                        <input className='Account-input' type='email' placeholder='Email...' value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                        <input className='Account-input' type='password' placeholder='Password...' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                        <button className='Account-button' type='submit'>Sign Up</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Account;
