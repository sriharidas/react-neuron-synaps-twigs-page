import React, { useEffect, useState } from "react";
import Header from "./Header";
import Synaps from "./Synaps";
import CreateSnapForm from "./CreateSnapForm";
import Animation from "../animation/Animation";
export default function SynapsContainer() {
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );
  const [DisplayForm, setDisplayForm] = useState(false);
  const [ParentSynap, setParentSynap] = useState({
    id: "",
    name: "",
  });
  const [updateState, setUpdateState] = useState(0);
  useEffect(() => {
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";
    console.log("Base Synaps", UserData.synaps);
    fetch("https://neurontech.herokuapp.com/synapses/parent/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserData.email,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Parent Synaps", resp);
        setUserData((prevState) => ({
          ...prevState,
          synaps: resp["Results"],
        }));
        animationContainer.style.visibility = "hidden";
      });
  }, []);
  useEffect(() => {
    console.log(UserData);
  }, [UserData]);
  const createSnap = (e) => {
    // e.preventDefault();
    const synapName = document.querySelector("#create-synap");
    console.log("synap name:", synapName.value, ParentSynap);
    let layer;
    layer = ParentSynap.name === "" ? 0 : 1;

    const data = JSON.stringify({
      snap_data: {
        user_email: UserData.email,
        synap_layer: layer,
        parent_number: ParentSynap.id,
        parent_name: ParentSynap.name,
        child_name: synapName.value,
      },
    });
    console.log(data);
    fetch("https://neurontech.herokuapp.com/synapses/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);

        setUpdateState((prevState) => prevState + 1);
        window.location.reload();
      });
  };
  return (
    <div className="synaps-container">
      <Header title={"Synaps Page"} />
      <div className="synaps-main-container">
        <Animation />
        {/* <button
          className="floating-add-synaps"
          onClick={() => {
            setDisplayForm(true);
            setParentSynap({ id: "", name: "" });
          }}
        >
          {" "}
          + add parent synap
        </button> */}
        {UserData.synaps !== "No data available" ? (
          <>
            <p style={{ marginTop: "10px", padding: "7px", fontWeight: "700" }}>
              <span style={{ padding: "inherit" }}>Base Synaps</span>
              <button
                onClick={() => {
                  setDisplayForm(true);
                  setParentSynap({ id: "", name: "" });
                }}
              >
                {" "}
                + add base synap
              </button>
            </p>

            {Object.keys(UserData.synaps).map((x) => (
              <Synaps
                id={x}
                name={UserData.synaps[x]}
                updateDisplay={setDisplayForm}
                updateParentSynap={setParentSynap}
                UpdateState={setUpdateState}
                Update={updateState}
              />
            ))}
          </>
        ) : (
          <div className="synap-message">
            <span> No data Avilable yet </span>
            <span>
              Create one?{""}
              <button
                onClick={() => {
                  setDisplayForm(true);
                  setParentSynap({ id: "", name: "" });
                }}
              >
                Create a Synap
              </button>
            </span>
          </div>
        )}
      </div>
      <CreateSnapForm
        createSnapFunc={createSnap}
        display={DisplayForm}
        updateDisplay={setDisplayForm}
        placeholder={"Enter the synap name"}
        label={"synap"}
      />
    </div>
  );
}
