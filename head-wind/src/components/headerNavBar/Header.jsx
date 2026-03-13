import "./Header.css";

function Header() {
  return (
    <header>
      <nav class="navbar">
        <div class="nav-container">
          <ul class="nav-links">
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

          <div class="logo">
            <h1>HeadWind</h1>
          </div>
        </div>
      </nav>

    </header >
  );
}

export default Header
