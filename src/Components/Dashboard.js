import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './FirebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, deleteDoc, updateDoc, doc, setDoc } from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Dashboard.css';
import logo from '../images/Logo.png';

function Dashboard() {
    // States
        const navigate = useNavigate();
        const [accountRequests, setAccountRequests] = useState([]);
        const [admins, setAdmins] = useState([]);

    // Fetch account requests from Firebase Firestore
        useEffect(() => {
            const fetchAccountRequests = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'accountRequests')); // Getting accountRequests from Firestore
                const requests = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }));
                console.log("Fetched account requests: ", requests); 
                setAccountRequests(requests); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            }; /* &':&_&: */

            fetchAccountRequests(); 
        }, [setAccountRequests]); 

    // Fetch admins from Firebase Firestore
        useEffect(() => {
            const fetchAdmins = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'users')); // Fetch users from Firestore
                    const usersList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setAdmins(usersList);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchAdmins();
        }, []);

    // Handle Accept
        const handleAccept = async (id, email, password) => {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            
                // Update Firestore status
                    const userRef = doc(db, 'accountRequests', id);

                    console.log('Attempting to update user status to approved');
                    await updateDoc(userRef, { status: 'approved' });
                    console.log('Successfully updated user status to approved');
                    
                    console.log(`Attempting to delete account request with ID: ${id}`);
                    await deleteDoc(doc(db, 'accountRequests', id));
                    console.log(`Successfully deleted account request with ID: ${id}`);

                    alert('Account approved!');

                // Update state
                    setAccountRequests(prevRequests =>
                        prevRequests.map(req =>
                            req.id === id ? { ...req, status: 'approved' } : req
                        )
                    );

                    setAccountRequests(prevRequests =>
                        prevRequests.filter(req => req.id !== id)
                    );

            } catch (error) {
                alert('Error approving account: ' + error.message);
            }
        };
        

    // Handle Reject
        const handleReject = async (id) => {
            try {
                await deleteDoc(doc(db, 'accountRequests', id));

                alert('Account request rejected.');

                // Remove from state
                    setAccountRequests(prevRequests =>
                        prevRequests.filter(req => req.id !== id)
                    );

            } catch (error) {
                alert('Error rejecting account: ' + error.message);
            }
        };


    // Handle Owner/Admin List
        

  return (
    <div className="Dashboard-container">
        <div>
            <h1 className="Dashboard-h1">
            <img src={logo} alt="Company Logo" className="Dashboard-logo" />
            </h1>
        </div>

        <div className="Dashboard-section">
            <h2>Account Requests</h2>
            {accountRequests.length > 0 ? (
            <ul>
                {accountRequests.map(request => (
                <li key={request.id}>
                    <p>
                        Email: {request.email}
                        <button className='accept-button' onClick={() => handleAccept(request.id, request.email, request.password)}><i className="bi bi-check-square-fill"></i></button>
                        <button className='reject-button' onClick={() => handleReject(request.id)}><i className="bi bi-x-square-fill"></i></button>
                    </p>
                </li>
                ))}
            </ul>
            ) : (
            <p>No account requests yet.</p>
            )}
        </div>

        <div className="Dashboard-section">
            <h2>Account Admins</h2>
            <p>Comming Soon...</p>
        </div>

        <div className="Dashboard-section">
            <h2>Order Requests</h2>
            <p>Comming Soon...</p>
        </div>

        <div className="Dashboard-section">
            <h2></h2>
            <p></p>
        </div>

        <div className="Dashboard-section">
            <h2></h2>
            <p></p>
        </div>

        <div className="Dashboard-section">
            <h2></h2>
            <p></p>
        </div>


    </div>
  );
}

export default Dashboard;

