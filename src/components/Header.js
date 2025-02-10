import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>NoteTaker</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/metrics">Metrics</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 