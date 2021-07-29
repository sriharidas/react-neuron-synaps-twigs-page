import React, { useState, useEffect } from "react";
import Header from "../synaps/Header";
import CreateSnapForm from "../synaps/CreateSnapForm";
import AddSynapstoTwigForm from "./addSynapstoTwigForm";
import TwigsSynaps from "./TwigsSynaps";
import Animation from "./../animation/Animation";
export default function TwigsContainer() {
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );
  const [TwigsData, setTwigsData] = useState({});
  const [EdgeSynaps, setEdgeSynaps] = useState({});
  const [Display, setDisplay] = useState(false);
  // const [TwigsandSyanp, setTwigsandSynap] = useState({});
  // const [isloaded, setloaded] = useState(false);
  const [selectedSynaps, setSelectedSynaps] = useState({});
  const [selectedTwig, setSelectedTwig] = useState([]);
  const [TwigSyanpForm, setTwigSyanpForm] = useState(false);
  useEffect(() => {
    // console.log(UserData.email, "'s Synaps are", UserData.synaps);
    fetch("https://neurontech.herokuapp.com/twigs/fetch/", {
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
  useEffect(() => {
    if (Object.keys(EdgeSynaps).length > 0) {
      return;
    }
    fetch("https://neurontech.herokuapp.com/synapses/edge/", {
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
        console.log(resp);
        setEdgeSynaps(resp[Object.keys(resp)[0]]);
      });
  }, [EdgeSynaps, UserData]);
  // useEffect(() => {
  //   if (Object.keys(TwigsData).length < 0) {
  //     return;
  //   }
  //   Object.keys(TwigsData).forEach((x) => {
  //     const data = JSON.stringify({
  //       email: UserData.email,
  //       twig_id: Number(x),
  //       twig_name: TwigsData[x],
  //     });
  //     // console.log(data);
  //     fetch("https://neurontech.herokuapp.com/twigs/get/synapses", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: data,
  //     })
  //       .then((resp) => resp.json())
  //       .then((resp) => {
  //         console.log(
  //           "Synaps of " + x + " is",
  //           typeof resp["synaps"],
  //           resp["synaps"]
  //         );
  //         if (typeof resp["synaps"] === "string") {
  //           setTwigsandSynap((prevState) => ({
  //             ...prevState,
  //             [String(x)]: {
  //               result: resp["synaps"],
  //             },
  //           }));
  //         } else {
  //           setTwigsandSynap((prevState) => ({
  //             ...prevState,
  //             [String(x)]: resp["synaps"],
  //           }));
  //         }
  //       });
  //   });
  //   setloaded(true);
  // }, [TwigsData, UserData]);

  const createTwig = (e) => {
    e.preventDefault();
    const newTwig = document.querySelector("#create-twig");
    console.log("create Twig for", newTwig.value);
    fetch("https://neurontech.herokuapp.com/twigs/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserData.email,
        twig: newTwig.value,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("result", resp);
        window.location.reload();
      });
    setDisplay(false);
  };

  const AddSynaps = (e) => {
    if (e.target.value.includes("add-")) {
      console.log(
        "Add a synaps to the twig",
        TwigsData[e.target.value.split("-").pop()]
      );
      setSelectedTwig({
        id: e.target.value.split("-").pop(),
        name: TwigsData[e.target.value.split("-").pop()],
      });

      return;
    }
    console.log("You selected ", e.target.value);
  };

  useEffect(() => {
    if (Object.keys(selectedTwig).length === 0) {
      return;
    }
    console.log("Twigs", selectedTwig);
    setTwigSyanpForm(true);
  }, [selectedTwig]);
  // useEffect(() => console.log("Twigs", TwigsData), [TwigsData]);
  useEffect(() => console.log("Edge Synap", EdgeSynaps), [EdgeSynaps]);
  // useEffect(() => console.log(" Synap", TwigsandSyanp), [TwigsandSyanp]);
  return (
    <div className="twigs-container">
      <Header title={"Twigs Page"} />
      <div className="twigs-main-container">
        <button className="floating-add-twigs" onClick={() => setDisplay(true)}>
          + Add a Twig
        </button>
        {Object.keys(TwigsData).length > 0 ? (
          <>
            <div className="twig-table-container">
              {EdgeSynaps !== {} && Object.keys(EdgeSynaps).length > 0 && (
                <div className="twigs-prop-table-container">
                  <table className="syanp-table">
                    <caption>Edge Synapes</caption>
                    <thead>
                      <tr>
                        <th>Syanp Id</th>
                        <th>Syanp Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(EdgeSynaps).map((item) => (
                        <tr>
                          <td>{item}</td>
                          <td>{EdgeSynaps[item]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="synap-message">
              <span> No data Avilable yet </span>
              <span>
                Create one?{""}
                <button
                  onClick={() => {
                    setDisplay(true);
                  }}
                >
                  Create a twig
                </button>
              </span>
            </div>
          </>
        )}

        <Animation />
        <TwigsSynaps
          UserData={UserData}
          TwigsData={TwigsData}
          AddSynaps={AddSynaps}
          props={false}
        />
      </div>
      <CreateSnapForm
        display={Display}
        updateDisplay={setDisplay}
        createSnapFunc={createTwig}
        placeholder={"Enter the Twig Value"}
        label={"twig"}
      />
      <AddSynapstoTwigForm
        display={TwigSyanpForm}
        UpdateDisplay={setTwigSyanpForm}
        twig={selectedTwig}
        edgeSynaps={EdgeSynaps}
        setSelectedSynaps={setSelectedSynaps}
        selectedSynaps={selectedSynaps}
        userData={UserData}
      />
    </div>
  );
}
