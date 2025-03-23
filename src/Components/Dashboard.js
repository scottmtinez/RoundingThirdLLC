import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './FirebaseConfig'; // Make sure Firebase is initialized correctly
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Dashboard.css';
import logo from '../images/Logo.png';

function Dashboard() {
  // States
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [trucks, setTrucks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [accountRequests, setAccountRequests] = useState([]);

  // Fetch account requests from Firebase Firestore

  useEffect(() => {
    const fetchAccountRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'accountRequests')); // Getting accountRequests from Firestore
        const requests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched account requests: ", requests); // Check if data is fetched correctly
        setAccountRequests(requests); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAccountRequests(); // Fetch the data when the component is mounted
  }, [setAccountRequests]); // This effect runs once when the component is mounted

  // Handle Accept
  const handleAccept = async (id, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Update Firestore status
      const userRef = doc(db, 'accountRequests', id);
      await updateDoc(userRef, { status: 'approved' });

      alert('Account approved!');

      // Update state
      setAccountRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === id ? { ...req, status: 'approved' } : req
        )
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


  return (
    <div className="Dashboard-container">
      <div>
        <h1 className="Dashboard-h1">
          <img src={logo} alt="Company Logo" className="Dashboard-logo" />
        </h1>
      </div>

      {/* Account Requests Section */}
      <div className="Dashboard-section">
        <h2>Account Requests</h2>
        {accountRequests.length > 0 ? (
          <ul>
            {accountRequests.map(request => (
              <li key={request.id}>
                <p>Email: {request.email}</p>
                <p>Status: {request.status}</p>
                <button onClick={() => handleAccept(request.id, request.email, request.password)}>Accept</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No account requests yet.</p>
        )}
      </div>

      {/* Other sections like Customers, Jobs, etc. */}

    </div>
  );
}

export default Dashboard;
