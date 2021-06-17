import React from "react";
import "./../../css/form.css";
export default function Input({ type, name, id, label, placeholder }) {
  return (
    <>
      <div className="form-groups">
        <label htmlFor={id}>{label}</label>
        <input type={type} name={name} id={id} placeholder={placeholder} />
      </div>
    </>
  );
}
