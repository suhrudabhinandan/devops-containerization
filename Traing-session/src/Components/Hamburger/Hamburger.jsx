import React, { useState } from "react";
import "./Hamburger.css";

const Hamburger = ({ links, onLogout }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (link, e) => {
    if (link.name === "Logout") {
      e.preventDefault();
      onLogout();  
      alert('You have been logged out')
    }
    setOpen(false); 
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-icon" onClick={() => setOpen(!open)}>
        <div className={`bar ${open ? "open" : ""}`}></div>
        <div className={`bar ${open ? "open" : ""}`}></div>
        <div className={`bar ${open ? "open" : ""}`}></div>
      </div>

      <nav className={`menu ${open ? "menu-open" : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                onClick={(e) => handleClick(link, e)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Hamburger;
