import { useState } from "react";
import "./Header.css";
import logo from "../../assets/headwind_icon.png";
import hamburger from "../../assets/hamburger.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">

          <div
            className="hamburger"
            onClick={() => setOpen(!open)}
          >
            <img
              src={hamburger}
              alt="hamburger icon"
            />
          </div>

          <div className="logo">
            <img src={logo} alt="logo" />
            <h2>HeadWind</h2>
          </div>

        </div>

        <ul className={`nav-menu ${open ? "show" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact</a></li>
        </ul>

      </nav>
    </header>
  );
}

export default Header;
