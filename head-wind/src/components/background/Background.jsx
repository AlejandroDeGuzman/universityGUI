import './Background.css';
import backgroundImage from "../../assets/background.png";

function Background({ children }) {
    return (
        <div className="background">
            {children}
        </div>
    );
}

export default Background;
