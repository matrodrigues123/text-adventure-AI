import React, { useState } from "react";
import './InputForm.css'

const InputForm = ({ onInputSubmit }) => {
  const [adventureSetting, setAdventureSetting] = useState("");

  const handleInputChange = (event) => {
    setAdventureSetting(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onInputSubmit(adventureSetting);
  };

  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <label className="inputLabel" htmlFor="inputField">Enter the setting for your text adventure:</label>
      <input
        id="inputField"
        type="text"
        value={adventureSetting}
        onChange={handleInputChange}
      />
      <button className="inputButton" type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
