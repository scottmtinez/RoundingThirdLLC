import Home from './components/Home';  
import Nav from './components/Nav';  
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Account from './components/Account';
import Estimate from './components/Estimate';
import Dashboard from './components/Dashboard';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, db } from './components/FirebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';


function App() {
  // States
    const [accountRequests, setAccountRequests] = useState([]);

  // Fetch account requests from Firestore when the app loads
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
          console.error("Error fetching account requests:", error);
        }
      };

      fetchAccountRequests();
    }, []);

  // Function to add an account request to Firestore
    const addAccountRequest = async (request) => {
      try {
        const docRef = await addDoc(collection(db, 'accountRequests'), request);
        setAccountRequests([...accountRequests, { id: docRef.id, ...request }]); // Update local state
      } catch (error) {
        console.error("Error adding account request:", error);
      }
    };

  
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account addAccountRequest={addAccountRequest} />} />
          <Route path="/dashboard" element={<Dashboard accountRequests={accountRequests} setAccountRequests={setAccountRequests} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
