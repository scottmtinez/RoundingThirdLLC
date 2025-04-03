import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth, db } from './components/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

// Import your components
  import Home from './components/Home';
  import Nav from './components/Nav';
  import Services from './components/Services';
  import About from './components/About';
  import Contact from './components/Contact';
  import Account from './components/Account';
  import Estimate from './components/Estimate';
  import Dashboard from './components/Dashboard';  

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
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <footer className='Footer'>© 2025 Rounding Third LLC All rights reserved.</footer>
    </div>
  );
}

export default App;
