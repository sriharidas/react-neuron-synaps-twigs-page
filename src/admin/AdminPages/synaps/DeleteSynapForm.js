import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
export default function DeleteSynapForm({
  display,
  userEmail,
  setDisplay,
  url,
  data,
  dropDown,
  selected,
  label,
}) {
  const [check, setCheck] = useState(false);
  const deleteFunc = (e) => {
    e.preventDefault();

    console.log(
      "resquest ",
      url,
      "From " + userEmail + "\nData ",
      JSON.stringify(data)
    );
    fetch("https://neurontech.herokuapp.com/" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(`${label} delete response`, resp);
        window.location.reload();
      })
      .catch((e) => console.warn(e));
    setDisplay(false);
  };
  return (
    <>
      {display && (
        <div className="synap-form ">
          <div className="synap-form-wrapper delete-form-wrapper">
            <h2>
              {/* Create a {label}{" "} */}
              Delete {label + " "}
              <button
                onClick={() => {
                  setDisplay(false);
                }}
              >
                <FaTimes />
              </button>
            </h2>

            <form
              className="delete-element"
              onSubmit={deleteFunc}
              method="POST"
            >
              <label>Please check the selected synap to delete</label>
              {!dropDown && (
                <input
                  name={"delete-" + label}
                  id={"delete-" + label}
                  placeholder="select a synap"
                  value={selected.name}
                  readOnly
                />
              )}
              {dropDown && (
                <select
                  name={"delete-" + label}
                  id={"delete-" + label}
                  placeholder="Delete Item"
                  readOnly
                >
                  <option>SYnaps</option>
                </select>
              )}
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => setCheck(e.target.checked)}
                />
                <label>Delete the above {label}</label>
              </div>

              <button type="submit" disabled={!check}>
                delete
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
