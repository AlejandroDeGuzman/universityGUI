import "./locationCard.css";
import { useEffect, useState } from "react";

function LocationCard({setPostcode}){
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        const cleanedInput = input.trim().toUpperCase();
        if (!cleanedInput) {
            alert("Please enter a valid postcode.");
            return;
        }
        if (cleanedInput.length < 2 || cleanedInput.length > 8) {
            alert("Please enter a valid postcode");
            return;
        }

        setPostcode(cleanedInput);
        setInput("");

        window.scrollTo({
            top:0 ,
            behaviour: "smooth"
        });
    }

    return (
        <div className="locationCard">
            <h2 className="location-title">Set Location</h2>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter postcode"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className = "location-input"
                />

                <button onClick={handleSubmit} className="submit-button">Set Location</button>
            </div>

        </div>
    )
}

export default LocationCard;