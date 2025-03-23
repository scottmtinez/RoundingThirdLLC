import './Nav.css';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png';

function Nav() {
  return (
    <div className="nav-container">
      <nav className="nav">
        <div className="logo">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Company Logo" className="Nav-logo" />
          <span className='Nav-title'>Rounding Third LLC</span>
        </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/estimate">Estimate</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/account">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
