import React from "react";
import "./Input.css";

const Input = ({ name, type, value,  handleChange }) => {
  return (
    <div className="input">
      <input name={name} type={type} value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
