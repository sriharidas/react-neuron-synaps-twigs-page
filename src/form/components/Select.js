import React from "react";

export default function Select({ name, id, label, value, onChange, disabled }) {
  console.log(disabled);
  return (
    <>
      <div className="form-groups">
        <label htmlFor={id}>{label}</label>
        <select
          placeholder="select a option"
          name={name}
          onChange={onChange}
          required
        >
          <option value="none">none</option>
          {value.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        {/* {disabled === true ? (
          // <p style={errorMsg}>This Field is temporarily not available</p>
        ) : null} */}
      </div>
    </>
  );
}
const errorMsg = {
  // margin: "10px 0",
  paddingTop: "5px",
  fontSize: "0.8rem",
  color: "red",
};
