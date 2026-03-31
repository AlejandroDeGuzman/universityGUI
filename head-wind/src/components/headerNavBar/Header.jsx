import { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/headwind_icon.png";
import hamburger from "../../assets/hamburger.png";
import TemperatureToggle from "../tempToggle/tempToggle";

function Header(unit, setUnit) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (open) {
                setOpen(false); // close menu on scroll
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [open]);

    return (
        <header>
            <nav className="navbar">
                <div className="nav-container">
                    <div
                        className="hamburger"
                        onClick={() => setOpen(!open)}
                    >
                        <img src={hamburger} alt="hamburger icon" />
                    </div>

                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h2>HeadWind</h2>
                    </div>

                    <div className="temp-button">
                        <TemperatureToggle unit={unit} setUnit={setUnit}/>
                    </div>
                </div>

                <ul className={`nav-menu ${open ? "show" : ""}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/test-page">Alternative Routes</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
