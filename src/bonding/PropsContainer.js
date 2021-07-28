import React, { useEffect, useState } from "react";
import Header from "../synaps/Header";
import TwigsSynaps from "../twigs/TwigsSynaps";
import CreateSnapForm from "./../synaps/CreateSnapForm";
export default function PropsContainer() {
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );
  const [DefaultProps, setDefaultProps] = useState({});
  const [DisplayForm, setDisplayForm] = useState(false);
  const [TwigsData, setTwigsData] = useState({});
  // const [UpdateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    fetch("/properties/twigs/propKey/fetch", {
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
        // console.log(resp);
        setDefaultProps(resp["Result"]);
      });
  }, []);

  useEffect(() => {
    // console.log(UserData.email, "'s Synaps are", UserData.synaps);
    fetch("/twigs/fetch/", {
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
        setTwigsData(resp.twigs);
      });
  }, [UserData]);

  const createProp = (e) => {
    const propName = document.querySelector("#create-props");
    console.log("new prop", propName.value);
    fetch("/properties/twigs/propKey/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserData.email,
        prop_name: propName.value,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Prop created", resp);
        window.location.reload();
      });
  };
  useEffect(() => console.log("deafult props", DefaultProps), [DefaultProps]);
  return (
    <>
      <div
        style={{ background: "#fff", color: "#000", height: "100vh" }}
        className="twigs-container"
      >
        <Header title={"Bonding"} />
        <div className="props-conatiner twigs-main-container">
          <button
            className="floating-props-btn"
            onClick={() => setDisplayForm(true)}
          >
            + Add Props
          </button>
          <TwigsSynaps
            UserData={UserData}
            AddSynaps={() => {}}
            TwigsData={TwigsData}
            props={true}
            propsList={DefaultProps}
          />
        </div>
      </div>
      <CreateSnapForm
        label="props"
        display={DisplayForm}
        updateDisplay={setDisplayForm}
        placeholder={"Enter the prop name"}
        createSnapFunc={createProp}
      />
    </>
  );
}
