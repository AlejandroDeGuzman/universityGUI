import React, { useState } from "react";
import "./tempToggle.css"

export default function TemperatureToggle({unit, setUnit}) {

  return (
    <button className="temp-toggle"
      onClick={() => setUnit(unit === "C" ? "F" : "C")}
    >
    <span className="temp-toggle__label">
        {unit === "C" ? "°C" : "°F"}
      </span>
    </button>
  );
}