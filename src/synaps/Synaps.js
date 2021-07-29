import React, { useEffect, useState } from "react";
import Animation from "../animation/Animation";

export default function Synaps({
  id,
  name,
  updateDisplay,
  updateParentSynap,
  Update,
}) {
  const [Child, setChild] = useState({});
  useEffect(() => {
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";
    fetch("https://neurontech.herokuapp.com/synapses/fetch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        synap: {
          id: id,
          name: name,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log("child of" + id + " : ", resp);
        // console.log(Object.keys(resp)[0], Object.values(resp)[0]);
        // if(Re)
        setChild(resp);
      });

    console.log(animationContainer.style.visibility);
    animationContainer.style.visibility = "hidden";

    // console.log(id, name);
  }, []);
  // console.log("prop", id, name);
  return (
    <>
      <div
        style={{
          borderLeft: "2px solid #000",
          margin: "15px",
          padding: " 5px 10px",
        }}
      >
        <Animation />
        <div>
          <span>{id + ") - " + name}</span>
          <button
            style={{ margin: " 0 10px", padding: "5px" }}
            onClick={() => {
              updateDisplay(true);
              updateParentSynap({ id: id, name: name });
            }}
          >
            + Add Synap
          </button>
        </div>
        {Object.keys(Child).length > 0 ? (
          <>
            {Object.keys(Child).map((x) => (
              <Synaps
                id={x}
                name={Child[x]}
                updateDisplay={updateDisplay}
                updateParentSynap={updateParentSynap}
              />
              // <span>Data</span>
            ))}
          </>
        ) : null}
        {/* {Object.keys(Child).length > 0 ? (
          <>
            <select>
              {Object.keys(Child).map((x) => (
                <option>{x + " - " + Child[x]}</option>
              ))}
            </select>
            {Object.keys(Child).map((x) => (
              <></>
            ))}
          </>
        ) : (
          <p>No child </p>
        )} */}
      </div>
    </>
  );
}
