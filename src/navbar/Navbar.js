import React from 'react';
import ag_logo from '../assets/ag_logo.svg';
export default function Navbar() {
  return (
    <div className="navbar-cont">
      <div className="navbar-sections">
        <div className="navbar-logo">
          <img src={ag_logo} height={35} alt="Internal Job Posting" />
        </div>
        <div className="navbar-right"></div>
      </div>
    </div>
  );
}
