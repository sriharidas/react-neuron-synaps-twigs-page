import React, { useEffect, useState } from "react";
import Animation from "../../../animation/Animation";
import { FaPlus, FaTimes } from "react-icons/fa";
export default function Synaps({
  id,
  name,
  updateDisplay,
  updateDeleteForm,
  updateParentSynap,
  updateDeleteItem,
  Update,
}) {
  const [Child, setChild] = useState({});
  useEffect(() => {
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";
    console.log(id, name);
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
        console.log(animationContainer.style.visibility);
        animationContainer.style.visibility = "hidden";
        console.log(resp[Object.keys(resp).pop()]);
        if (resp === {}) {
          console.log(id);
          return;
        }
        console.log("resp", resp);
        setChild(resp);
      });
    console.log(name);

    // console.log(id, name);
  }, []);
  // console.log("prop", id, name);
  return (
    <>
      {Child !== {} && (
        <div
          style={{
            borderLeft: "2px solid #000",
            margin: "15px",
            padding: " 5px 10px",
          }}
        >
          {console.log("child", Child)}
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
              <FaPlus />
            </button>
            <button
              onClick={() => {
                updateDeleteForm(true);
                updateDeleteItem({
                  id: id,
                  name: name,
                });
                console.log("remove Synap req", {
                  id: id,
                  name: name,
                });
              }}
            >
              <FaTimes />
            </button>
          </div>

          {Object.keys(Child).length > 0 ? (
            <>
              {Object.keys(Child).map((x) => (
                <Synaps
                  id={x}
                  name={Child[x]}
                  updateDisplay={updateDisplay}
                  updateDeleteForm={updateDeleteForm}
                  updateParentSynap={updateParentSynap}
                  updateDeleteItem={updateDeleteItem}
                />
                // <span>Data</span>
              ))}
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
