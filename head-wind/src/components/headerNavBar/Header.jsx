import "./Header.css";
import logo from "../../assets/headwind_icon.png";
import hamburger from "../../assets/hamburger.png";


function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <div className="hamburger">
            <img src={hamburger} alt="hamburger icon"></img>
          </div>

          <div className="logo">
            <img src={logo} alt="logo"></img>
            <h2>HeadWind</h2>
          </div>
        </div>
      </nav>

    </header >
  );
}

export default Header
