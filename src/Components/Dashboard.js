import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./FirebaseConfig";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, deleteDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import "./Dashboard.css";
import logo from '../images/Logo.png';
import emailjs from "@emailjs/browser";

function Dashboard() {
    // States
        const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [contactMessages, setContactMessages] = useState([]);
        const [accountRequests, setAccountRequests] = useState([]);
        const [admins, setAdmins] = useState([]);
        const [selectedAdmin, setSelectedAdmin] = useState(null);
        const [selectedMessage, setSelectedMessage] = useState(null);
        const [showPopup, setShowPopup] = useState(false);
        const [sortOrder, setSortOrder] = useState('asc');
        const [estimates, setEstimates] = useState([]);
        const [selectedEstimate, setSelectedEstimate] = useState(null);

        const [formData, setFormData] = useState({
            name: "",
            email: "",
            message: ""
        });

        const [data, setData] = useState([
            {
              id: 1,
              date: '',
              description: '',
              category: '',
              assignedTo: '',
              status: '',
              timeSpent: '',
            }
          ]);

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

    // Handle Reject - Account Requests
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
            
                    console.log("Fetched admins:", request); 
                    setAdmins(request);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchAdmins();
        }, []);

    // Handle Admin Delete - Admins List
        const handleDelete = async (id) => {
            try {
                await deleteDoc(doc(db, 'accounts', id));
                alert('Account deleted.');
                setAdmins(prevRequests => prevRequests.filter(req => req.id !== id));
            } catch (error) {
                alert('Error deleting account: ' + error.message);
            }
        };

    // Fetch contact page messages
        useEffect(() => {
            const fetchContactMessages = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'ContactPage')); 
                    const messages = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log("Fetched contact messages: ", messages); 
                    setContactMessages(messages); 
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            fetchContactMessages();
        }, []); 

    // Handle Message Delete - Message List
        const handleDeleteMessage = async (id) => {
            try {
                await deleteDoc(doc(db, 'ContactPage', id));
                alert('Message deleted.');
                setContactMessages(prevRequests => prevRequests.filter(req => req.id !== id));
            } catch (error) {
                alert('Error deleting message: ' + error.message);
            }
        };

    // Handle Input Change - Tracking Spreadsheet
        const handleInputChange = (id, field, value) => {
            setData(prev =>
            prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
            );
        };
        
        const addRow = () => {
            const newRow = {
              id: Date.now(),
              date: '',
              description: '',
              category: '',
              assignedTo: '',
              status: '',
              timeSpent: '',
            };
            setData([...data, newRow]);
        };

        const deleteRow = (id) => {
            setData(data.filter(row => row.id !== id));
        };

        const toggleSortByDate = () => {
            const sorted = [...data].sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });

            setData(sorted);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        };

    // Handle Estimates - Estimates List
        useEffect(() => {
            const fetchEstimates = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'estimates'));
                    const estimateData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setEstimates(estimateData);
                } catch (error) {
                    console.error("Error fetching estimates:", error);
                }
            };
        
            fetchEstimates();
        }, []);

        const handleDeleteEstimate = async (id) => {
            try {
                await deleteDoc(doc(db, 'estimates', id));
                setEstimates(prev => prev.filter(estimate => estimate.id !== id));
                alert('Estimate deleted.');
            } catch (error) {
                alert('Error deleting estimate: ' + error.message);
            }
        };
    
    // Footer/Contact Form Popup - Send Message
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const sendEmail = (e) => {
            e.preventDefault();
    
            emailjs.send(
                "service_hg0jpwf",     
                "template_z00wdye",    
                formData,
                "Cdu-w74-z5WdXHRRi"   
            ).then(() => {
                alert("Message sent successfully!");
                setShowPopup(false);
                setFormData({ name: "", email: "", message: "" }); 
            }).catch((error) => {
                alert("Failed to send message. Try again later.");
                console.error("EmailJS Error:", error);
            });
        };

    return (
        <div>
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

            {/* Admin List Section */}
            <div className="Dashboard-section">
                <h2>Account Admins</h2>
                {admins.length > 0 ? (
                    <div className="admin-list-container">
                        <ul className="admin-list">
                            {admins.map(admin => (
                                <li key={admin.id}>
                                    {/* Clickable Name to Open Popup */}
                                    <p 
                                        className="admin-link" 
                                        onClick={() => setSelectedAdmin(admin)}
                                    >
                                        {admin.Name}

                                        <button className='admin-reject-button' onClick={() => handleDelete(admin.id)}>
                                            <i className="bi bi-x-square-fill"></i>
                                        </button>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No admins found.</p>
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

            {/* Contact Page Messages Section */}
            <div className="Dashboard-section">
                <h2>Contact Messages</h2>
                    {contactMessages.length > 0 ? (
                        <div className="message-list-container">
                            <ul className="message-list">
                                {contactMessages.map(message => (
                                    <li key={message.id}>
                                        <p 
                                            className="message-link" 
                                            onClick={() => setSelectedMessage(message)}
                                        >
                                            {message.name}

                                            <button className='message-reject-button' onClick={() => handleDeleteMessage(message.id)}>
                                                <i className="bi bi-x-square-fill"></i>
                                            </button>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No messages found.</p>
                    )}
            </div>

            {/* Message Details Popup */}
            {selectedMessage && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>Message Details</h2>
                        <p><strong>Name:</strong> {selectedMessage.name}</p>
                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                        <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                        <p><strong>Message:</strong> {selectedMessage.message}</p>
                        <button className="close-button" onClick={() => setSelectedMessage(null)}>Close</button>
                    </div>
                </div>
            )}

            {/* Estiamtes */}
            <div className="Dashboard-section">
                <h2>Estimates</h2>
                {estimates.length > 0 ? (
                    <div className="estimate-list-container">
                        <ul className="estimate-list">
                            {estimates.map(est => (
                                <li key={est.id}>
                                    <p 
                                        className="estimate-link"
                                        onClick={() => setSelectedEstimate(est)}
                                    >
                                        {est.name || "Unnamed Request"}
                                        <button
                                            className="estimate-del-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteEstimate(est.id);
                                            }}
                                        >
                                            <i className="bi bi-x-square-fill"></i>
                                        </button>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No estimates found.</p>
                )}
            </div>

            {/* Estimats Popup */}
            {selectedEstimate && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>Estimate Details</h2>
                        <p><strong>Name:</strong> {selectedEstimate.name}</p>
                        <p><strong>Email:</strong> {selectedEstimate.email}</p>
                        <p><strong>Phone:</strong> {selectedEstimate.phone}</p>
                        <p><strong>Pick-Up:</strong> {selectedEstimate.pickup_location}</p>
                        <p><strong>Drop-Off:</strong> {selectedEstimate.dropoff_location}</p>
                        <p><strong>Move Date:</strong> {selectedEstimate.moving_date}</p>
                        <p><strong>Residence Type:</strong> {selectedEstimate.residence_type}</p>
                        <p><strong>Number of Rooms:</strong> {selectedEstimate.room_size}</p>
                        <p><strong>Special Items:</strong> {selectedEstimate.specialty_items}</p>
                        <p>Submitted: {selectedEstimate.submitted_at}</p>
                        <button className="estimate-respond-btn" title="Go to Titan Email" onClick={() => window.open("https://app.titan.email", "_blank")}><i className="bi bi-send"></i></button>
                        <button className="close-button" onClick={() => setSelectedEstimate(null)}>Close</button>
                    </div>
                </div>
            )}

            {/* Orders Popup*/}

            {/* */}
            <div className="Dashboard-section">
                <h2></h2>
            </div>


        </div>

            {/* Tracking Spreadsheet */}
            <div className="Dashboard-tracking-section">
            <h2>Tracking Sheet</h2>
            <table className="table-auto w-full border">
                <thead>
                <tr className="">
                    <th className="Dashboard-tracking-Date-header">
                    Date
                    <button
                        onClick={toggleSortByDate}
                        className="Dashboard-tracking-filter"
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                    </th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map(task => (
                    <tr key={task.id}>
                    {['date', 'description', 'category', 'assignedTo', 'status', 'timeSpent'].map(field => (
                        <td key={field}>
                        <input
                            type="text"
                            className="Dashboard-TrackingSheet-input"
                            value={task[field]}
                            onChange={e => handleInputChange(task.id, field, e.target.value)}
                        />
                        </td>
                    ))}
                    <td>
                        <button
                        className="Dashboard-TrackingSheet-delete-btn"
                        onClick={() => deleteRow(task.id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

                <button
                    className="Dashboard-TrackingSheet-AddRow-btn mt-2"
                    onClick={addRow}
                >
                    + Add Row
                </button>
            </div>

            {/* Footer Section */}
            <footer className="Dashboard-footer">
                Need something fixed?
                <a href="#" className='Dashboard-footer-link' onClick={(e) => { e.preventDefault(); setShowPopup(true); }}>
                     Click here
                </a>
            </footer>

            {/* Contact Popup */}
            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setShowPopup(false)}>X</span>
                        <h2 className="Dashboard-footer-contact-h2">Contact Us</h2>
                        <form className="Dashboard-footer-contact-form" onSubmit={sendEmail}>
                            <input 
                                className="Dashboard-footer-contact-input" 
                                type="text" 
                                name="name"
                                placeholder="Enter your name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                className="Dashboard-footer-contact-input" 
                                type="email" 
                                name="email"
                                placeholder="Enter your email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                            <textarea 
                                className="Dashboard-footer-contact-input" 
                                name="message"
                                placeholder="How can we help you?" 
                                rows="4" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required
                            />
                            <button className="Dashboard-footer-contact-btn" type="submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
