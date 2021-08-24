import React, { useEffect, useState } from "react";
import Animation from "../../../animation/Animation";
import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUp,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
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
  const [displayChild, setdisplayChild] = useState(true);
  useEffect(() => {
    const animationContainer = document.getElementById("animation-container");
    // animationContainer.style.visibility = "visible";
    console.log(id, name);
    const data = JSON.stringify({
      synap: {
        id: id,
        name: name,
        email: JSON.parse(localStorage.getItem("loginData"))["email"],
      },
      session_token: JSON.parse(localStorage.getItem("loginData"))[
        "session_token"
      ],
    });
    console.log(data);
    fetch("https://neurontech.herokuapp.com/synapses/fetch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log("child of" + id + " : ", resp);
        // console.log(Object.keys(resp)[0], Object.values(resp)[0]);
        console.log(animationContainer.style.visibility);
        // animationContainer.style.visibility = "hidden";
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
            borderLeft: "1px solid #000",
            margin: "15px",
            padding: " 5px 10px",
          }}
        >
          {console.log("child", Child)}
          <Animation />

          <div>
            <span>{id + ") - " + name}</span>
            <button
              style={btnStyle}
              // style={{ margin: " 0 10px", padding: "5px" }}
              onClick={() => {
                updateDisplay(true);
                updateParentSynap({ id: id, name: name });
              }}
            >
              <FaPlus />
            </button>
            <button
              style={btnStyle}
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

            {Object.keys(Child).length > 0 ? (
              <button
                style={btnStyle}
                onClick={() => setdisplayChild(!displayChild)}
              >
                {displayChild ? <FaArrowUp /> : <FaArrowDown />}
              </button>
            ) : (
              ""
            )}
          </div>

          {displayChild && Object.keys(Child).length > 0 ? (
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

const btnStyle = { margin: " 0 5px", padding: "5px" };
