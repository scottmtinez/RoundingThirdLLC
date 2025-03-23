import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../images/Logo.png';

function Dashboard() {
    //States
        const navigate = useNavigate();
        const [accountRequests, setAccountRequests] = useState([]);
        const [orders, setOrders] = useState([]);
        const [customers, setCustomers] = useState([]);
        const [jobs, setJobs] = useState([]);
        const [revenue, setRevenue] = useState(0);
        const [trucks, setTrucks] = useState([]);
        const [employees, setEmployees] = useState([]);

    // Fetch account requests from Firebase Firestore
        useEffect(() => {
            const fetchAccountRequests = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'accountRequests'));
                    const requests = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setAccountRequests(requests);
                } catch (error) {
                    console.error('Error fetching account requests:', error);
                }
            };

            fetchAccountRequests();
        }, []);

    // Handle Accept
        const handleAccept = async (email, password) => {
            try {
                // Create the user in Firebase Authentication
                await createUserWithEmailAndPassword(auth, email, password);
                
                // Update the Firestore document to mark it as 'approved'
                const userRef = doc(db, 'accountRequests', email);
                await updateDoc(userRef, { status: 'approved' });
                
                alert("Account approved!");
                // Optionally, re-fetch the requests after updating
                const updatedRequests = accountRequests.filter(req => req.email !== email);
                setAccountRequests(updatedRequests);
            } catch (error) {
                alert("Error approving account: " + error.message);
            }
        };
    
    // Handle Reject
        const handleReject = async (email) => {
            try {
                // Delete the request from Firestore
                const userRef = doc(db, 'accountRequests', email);
                await deleteDoc(userRef);
                
                alert("Account request rejected.");
                // Remove the rejected request from the UI
                const updatedRequests = accountRequests.filter(req => req.email !== email);
                setAccountRequests(updatedRequests);
            } catch (error) {
                alert("Error rejecting account: " + error.message);
            }
        };



    // Simulating API calls
    useEffect(() => {


        setOrders([
            { id: 101, customer: "Alice", status: "Pending", amount: "$300" },
            { id: 102, customer: "Bob", status: "Completed", amount: "$500" },
        ]);

        setCustomers([
            { id: 1, name: "Michael Brown", moves: 3 },
            { id: 2, name: "Sarah Wilson", moves: 1 },
        ]);

        setJobs([
            { id: 201, customer: "Tom", date: "2025-03-10", status: "Scheduled" },
            { id: 202, customer: "Emma", date: "2025-03-12", status: "Completed" },
        ]);

        setRevenue(15000); // Example revenue data

        setTrucks([
            { id: "TX-001", status: "Available", location: "Warehouse A" },
            { id: "TX-002", status: "On Job", location: "Downtown" },
        ]);

        setEmployees([
            { id: 1, name: "Carlos M.", role: "Driver", status: "On Duty" },
            { id: 2, name: "Lisa T.", role: "Mover", status: "Off Duty" },
        ]);
    }, []);

    return (
        <div className="Dashboard-container">
            <div>
                <h1 className='Dashboard-h1'>
                    <img src={logo} alt="Company Logo" className="Dashboard-logo" />
                </h1>
            </div>

            {/* Account Requests Section */}
            <div className="Dashboard-section">
                <h2>Account Requests</h2>
                {accountRequests.length === 0 ? (
                    <p>No account requests at this time.</p>
                ) : (
                    <ul>
                        {accountRequests.map(req => (
                            <li className="Dashboard-Account-Requests" key={req.id}>
                                {req.name} - {req.email}
                                <button className="accept-button" onClick={() => handleAccept(req.id)}>
                                    <i className="bi bi-check-square-fill"></i>
                                </button>
                                <button className="reject-button" onClick={() => handleReject(req.id)}>
                                    <i className="bi bi-x-square-fill"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Orders Section */}
            <div className="Dashboard-section">
                <h2>Orders</h2>
                {orders.length === 0 ? <p>No orders at this time.</p> :
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>{order.customer} - {order.status} - {order.amount}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Customers Section */}
            <div className="Dashboard-section">
                <h2>Customers</h2>
                {customers.length === 0 ? <p>No customers at this time.</p> :
                    <ul>
                        {customers.map(customer => (
                            <li key={customer.id}>{customer.name} - {customer.moves} moves</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Job Management Section */}
            <div className="Dashboard-section">
                <h2>Job Management</h2>
                {jobs.length === 0 ? <p>No jobs scheduled.</p> :
                    <ul>
                        {jobs.map(job => (
                            <li key={job.id}>{job.customer} - {job.date} - {job.status}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Financial Overview */}
            <div className="Dashboard-section">
                <h2>Financial Overview</h2>
                <p>Total Revenue: ${revenue}</p>
            </div>

            {/* Employee Management */}
            <div className="Dashboard-section">
                <h2>Employee Management</h2>
                {employees.length === 0 ? <p>No employees assigned.</p> :
                    <ul>
                        {employees.map(emp => (
                            <li key={emp.id}>{emp.name} - {emp.role} - {emp.status}</li>
                        ))}
                    </ul>
                }
            </div>

            {/* Truck Tracking */}
            <div className="Dashboard-section">

            </div>

            <div className='Dashboard-section-spreadsheet'>
                <h1 className='Dashboard-h1'>Tracking Sheet</h1>
                <table>
                    <tr>
                        <th>Truck ID</th>
                        <th>Status</th>
                        <th>Location</th>
                    </tr>
                    {trucks.map(truck => (
                        <tr key={truck.id}>
                            <td>{truck.id}</td>
                            <td>{truck.status}</td>
                            <td>{truck.location}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default Dashboard;

