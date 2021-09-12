import React from "react";

export default function CreateSnapForm({
  placeholder,
  label,
  createSnapFunc,
  display,
  updateDisplay,
}) {
  return (
    <>
      {display && (
        <div className="synap-form">
          <div className="synap-form-wrapper">
            <h2>
              Create a {label}{" "}
              <button onClick={() => updateDisplay(false)}>x</button>
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateDisplay(false);
              }}
            >
              <input
                name={"create-" + label}
                id={"create-" + label}
                placeholder={placeholder}
              />
              <button type="submit" onClick={createSnapFunc}>
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
