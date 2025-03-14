import Home from './components/Home';  
import Nav from './components/Nav';  
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Account from './components/Account';
import Estimate from './components/Estimate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
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
          <Route path="/Account" element={<Account />} /> {/* NOTE: Will be deleted and a sub domain will be made for the owners to use */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
