import React from "react";

export const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className="form-input"
        onChange={handleChange}
      />
    </div>
  );
};
