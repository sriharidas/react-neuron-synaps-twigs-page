import React from "react";

export default function Select({ name, id, label, value, onChange }) {
  return (
    <>
      <div className="form-groups">
        <label htmlFor={id}>{label}</label>
        <select placeholder="select a option" name={name} onChange={onChange}>
          <option value="none">none</option>
          {value.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
