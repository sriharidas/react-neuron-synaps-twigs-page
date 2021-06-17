import React from "react";

export default function Select({ name, id, label, value }) {
  return (
    <>
      <div className="form-groups">
        <label htmlFor={id}>{label}</label>
        <select placeholder="select a option" name={name}>
          {value.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
}
