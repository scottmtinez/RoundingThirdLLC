import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./FirebaseConfig";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, deleteDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import "./Dashboard.css";
import logo from '../images/Logo.png';

function Dashboard() {
    // States
        const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [contactMessages, setContactMessages] = useState([]);
        const [accountRequests, setAccountRequests] = useState([]);
        const [admins, setAdmins] = useState([]);
        const [selectedAdmin, setSelectedAdmin] = useState(null);

    // Fetch contact page Messages


    // Fetch account requests from Firebase Firestore
        useEffect(() => {
            const fetchAccountRequests = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'accountRequests')); 
                    const requests = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log("Fetched account requests: ", requests); 
                    setAccountRequests(requests); 
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchAccountRequests(); 
        }, []); 

    // Handle Accept
        const handleAccept = async (id, email, password, position) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const userId = userCredential.user.uid; // Extract user ID
                
                // Update Firestore status
                const userRef = doc(db, 'accountRequests', id);
                console.log('Attempting to update user status to approved');
                await updateDoc(userRef, { status: 'approved' });
                console.log('Successfully updated user status to approved');
                
                console.log(`Attempting to delete account request with ID: ${id}`);
                await deleteDoc(doc(db, 'accountRequests', id));
                console.log(`Successfully deleted account request with ID: ${id}`);

                console.log('Attempting to add user to accounts collection');
                await setDoc(doc(db, 'accounts', userId), {
                    id: userId,
                    email: email,
                    position: position || 'Not specified', 
                    createdAt: new Date()
                });
                console.log('Successfully added user to accounts collection');

                alert('Account approved!');

                // Update state
                setAccountRequests(prevRequests => prevRequests.filter(req => req.id !== id));
            } catch (error) {
                alert('Error approving account: ' + error.message);
            }
        };

    // Handle Reject
        const handleReject = async (id) => {
            try {
                await deleteDoc(doc(db, 'accountRequests', id));
                alert('Account request rejected.');
                setAccountRequests(prevRequests => prevRequests.filter(req => req.id !== id));
            } catch (error) {
                alert('Error rejecting account: ' + error.message);
            }
        };
        
    // Fetch Admins List
        useEffect(() => {
            const fetchAdmins = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'accounts')); 
                    const request = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
            
                    console.log("Fetched admins:", request); // Debugging log
                    setAdmins(request);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchAdmins();
        }, []);

    // Get contact page messages

    return (
        <div className="Dashboard-container">
            {/* Header Section */}
            <div className="Dashboard-section">
                <h1 className="Dashboard-h1">
                    <img src={logo} alt="Company Logo" className="Dashboard-logo" />
                </h1>
            </div>

            {/* Account Request */}
            <div className="Dashboard-section">
            <h2>Account Requests</h2>
                {accountRequests.length > 0 ? (
                    <ul>
                        {accountRequests.map(request => (
                            <li key={request.id}>
                                <p>
                                    {request.email}
                                    <button className='accept-button' 
                                        onClick={() => handleAccept(request.id, request.email, request.password, request.position)}>
                                        <i className="bi bi-check-square-fill"></i>
                                    </button>
                                    <button className='reject-button' onClick={() => handleReject(request.id)}>
                                        <i className="bi bi-x-square-fill"></i>
                                    </button>
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No account requests yet.</p>
                )}
            </div>

            {/* Admin Details Popup */}
            {selectedAdmin && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>Admin Details</h2>
                        <p><strong>Name:</strong> {selectedAdmin.Name}</p>
                        <p><strong>Email:</strong> {selectedAdmin.email}</p>
                        <p><strong>Position:</strong> {selectedAdmin.position || "Not specified"}</p>
                        <button className="close-button" onClick={() => setSelectedAdmin(null)}>Close</button>
                    </div>
                </div>
            )}

            {/* Admin List Section */}
            <div className="Dashboard-section">
                <h2>Account Admins</h2>
                {admins.length > 0 ? (
                    <ul>
                        {admins.map(admin => (
                            <li key={admin.id}>
                                {/* Clickable Name to Open Popup */}
                                <p 
                                    className="admin-link" 
                                    onClick={() => setSelectedAdmin(admin)}
                                >
                                    {admin.Name}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No admins found.</p>
                )}
            </div>

            {/* Contact Page Messages Section */}
            <div className="Dashboard-section">
                <h2>Messages</h2>

            </div>

            {/* N/A */}
            <div className="Dashboard-section">
                <h2></h2>
            </div>
        </div>
    );
}

export default Dashboard;
