import React from "react";
import "./../../css/form.css";
export default function Input({
  type,
  name,
  id,
  label,
  placeholder,
  onChange,
}) {
  return (
    <>
      <div className="form-groups">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
        />
        {type === "text" ? (
          <p id={id + "-error"} style={errorMsg}>
            {/* Password doesn't match */}
          </p>
        ) : null}
        {type === "password" ? (
          <p className={id + "-error"} style={errorMsg}>
            {/* Password doesn't match */}
          </p>
        ) : null}
        {type === "email" ? (
          <p className="email-error" id={id + "-error"} style={errorMsg}>
            {/* invalid */}
          </p>
        ) : null}
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
