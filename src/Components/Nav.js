import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../images/Logo.png';

function Nav() {
  // States
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="nav-container">
        <nav className="nav">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="navbar-logo">
              <img src={logo} alt="Company Logo" className="Nav-logo" />
            </Link>
          </div>
  
          {/* Mobile Menu Button */}
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
  
          {/* Navigation Links */}
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li><Link to="/home" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link to="/estimate" onClick={() => setIsOpen(false)}>Estimate</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    );
  }

export default Nav;
