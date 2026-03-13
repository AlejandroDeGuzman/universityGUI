import "./Header.css";

function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <a href="">Home</a>
            </li>

            <li>
              <a href="">Alternative Routes</a>
            </li>

            <li>
              <a href="">About</a>
            </li>
          </ul>

          <div className="logo">
            <h2>HeadWind</h2>
          </div>
        </div>
      </nav>

    </header >
  );
}

export default Header
