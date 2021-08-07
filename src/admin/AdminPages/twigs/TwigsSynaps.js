import React, { useState, useEffect } from "react";
import Animation from "../../../animation/Animation";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import DeleteSynapsForm from "../synaps/DeleteSynapForm";
export default function TwigsSynaps({
  UserData,
  AddSynaps,
  TwigsData,
  props,
  propsList,
}) {
  const [TwigsandSyanp, setTwigsandSynap] = useState({});
  const [isloaded, setloaded] = useState(false);
  const [selectedTwigProps, setSelectedTwigProps] = useState({});
  const [selectedTwig, setSelectedtwig] = useState("");
  const [propForm, setPropForm] = useState(false);
  const [display, setDisplay] = useState(false);
  const [selectedSynapData, setselectedSynapData] = useState({});
  const [selectedTwigData, setselectedTwigData] = useState({});
  const [displayDelete, setDisplayDelete] = useState(false);
  const [deleteItemData, setDeleteItemData] = useState({
    url: "",
    data: "",
    label: "",
    selected: "",
  });
  useEffect(() => {
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";
    console.log(Object.keys(TwigsData).length);
    if (Object.keys(TwigsData).length <= 0) {
      console.log("No data");
      animationContainer.style.visibility = "hidden";
      return;
    }

    Object.keys(TwigsData).forEach((x) => {
      const data = JSON.stringify({
        email: UserData.email,
        twig_id: Number(x),
        twig_name: TwigsData[x],
      });
      console.log(data);
      fetch("https://neurontech.herokuapp.com/twigs/get/synapses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((resp) => {
          if (!resp.ok) alert("Request Failed!");
          return resp.json();
        })
        .then((resp) => {
          console.log(
            "Synaps of " + x + " is",
            typeof resp["synaps"],
            resp["synaps"]
          );
          if (typeof resp["synaps"] === "string") {
            setTwigsandSynap((prevState) => ({
              ...prevState,
              [String(x)]: {
                result: resp["synaps"],
              },
            }));
          } else {
            setTwigsandSynap((prevState) => ({
              ...prevState,
              [String(x)]: resp["synaps"],
            }));
          }
          animationContainer.style.visibility = "hidden";
        })
        .catch((err) => console.warn("twig id " + x + " :- " + err));
    });

    setloaded(true);
  }, [TwigsData, UserData]);
  useEffect(() => {
    if (selectedTwig === "") return;
    console.log(TwigsData[selectedTwig]);
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";
    fetch("/twigs/get/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserData.email,
        twig_id: selectedTwig,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setSelectedTwigProps(resp);
        animationContainer.style.visibility = "hidden";
      });
  }, [selectedTwig]);
  useEffect(() => console.log("prop", selectedTwigProps), [selectedTwigProps]);
  const addPropstoTwig = (e) => {
    e.preventDefault();
    const prop_name = document.querySelector("#props-name").value;
    const prop_value = document.querySelector("#props-value").value;
    // console.log(prop_value);
    const data = {
      email: UserData.email,
      twig_id: Number(selectedTwig),
      twig_prop_key_id: Number(
        Object.keys(propsList)[Object.values(propsList).indexOf(prop_name)]
      ),
      twig_prop_val: prop_value,
    };
    console.log("add", JSON.stringify(data));
    fetch("/properties/twigs/propKey/value", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("addes props ?", resp);
        window.location.reload();
      });
    setPropForm(false);
  };
  useEffect(() => {
    if (selectedTwigData === {}) return;
    console.log("select-" + selectedTwigData.id);
    const SynapDropDown = document.querySelector(
      "#select-" + selectedTwigData.id
    );
    console.log(SynapDropDown);
    // if (SynapDropDown !== null && SynapDropDown.value === "None")
    //   document.querySelector(
    //     "#delete-synap-" + selectedTwigData.id
    //   ).style.display = "none";
  }, [selectedTwigData]);
  return (
    <>
      <Animation />
      {TwigsandSyanp !== {} && Object.keys(TwigsData).length > 0 && (
        <div className="twigs-prop-table-container">
          <div className="table-wrapper">
            <table className="twigs-table">
              <caption>Twigs Table</caption>
              <thead>
                <tr>
                  <th>Twig id</th>
                  <th>Twig name</th>

                  {!props && <th>Connected Synaps</th>}
                </tr>
              </thead>
              <tbody>
                {Object.keys(TwigsData).map((x) => (
                  <tr>
                    {/* <span>{x + " - " + TwigsData[x]} </span> */}
                    <td>{x}</td>
                    <td
                      onClick={() => {
                        props && setSelectedtwig(x);
                      }}
                    >
                      {TwigsData[x] + " "}
                      <span>
                        {props && (
                          <button
                            onClick={() => {
                              console.log("select a prop", propsList);
                              setPropForm(true);
                            }}
                            className="add-props-btn"
                          >
                            <FaPlus />
                          </button>
                        )}
                        {
                          <button
                            onClick={() => {
                              setDeleteItemData({
                                url: "twigs/delete/",
                                data: {
                                  email: UserData.email,
                                  twig_id: Number(x),
                                },
                                selected: { name: TwigsData[x] },
                                label: "twig",
                              });
                              setDisplay(true);
                            }}
                          >
                            <FaTimes />
                          </button>
                        }
                      </span>
                    </td>
                    {!props && (
                      <td>
                        <select
                          id={"select-" + x}
                          value={selectedTwigProps.id}
                          onClick={(e) => {
                            AddSynaps(e);
                            setselectedSynapData({
                              id: Number(e.target.value.split(" - ").shift()),
                              name: e.target.value.split(" - ").pop(),
                            });

                            setselectedTwigData({
                              id: Number(x),
                            });
                          }}
                        >
                          {isloaded &&
                          Object.keys(TwigsandSyanp).length ===
                            Object.keys(TwigsData).length &&
                          Object.keys(TwigsandSyanp[x]).pop() !== "result" ? (
                            <>
                              {Object.keys(TwigsandSyanp[x]).map((data) => (
                                <option
                                  selected={true}
                                  value={data + " - " + TwigsandSyanp[x][data]}
                                >
                                  {data + " - " + TwigsandSyanp[x][data]}
                                </option>
                              ))}
                            </>
                          ) : (
                            <>
                              <option value="None">None</option>
                            </>
                          )}
                          <option value={"add-" + x}> + Add Synap</option>
                        </select>

                        <button
                          id={"delete-synap-" + x}
                          onClick={() => {
                            setDisplay(true);
                            setDeleteItemData({
                              url: "twigs/unbond/",
                              data: {
                                email: UserData.email,
                                twig_id: selectedTwigData.id,
                                synap_id: selectedSynapData.id,
                              },
                              selected: { name: selectedSynapData.name },
                              label: "unbond",
                            });
                          }}
                        >
                          <FaTimes />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {props && (
            <div className="props-table-container">
              <div className="props-table-wrapper">
                <table className="props-table">
                  <caption>Props</caption>
                  <thead>
                    <tr>
                      <th colSpan="2">Props</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(selectedTwigProps).length > 0 ? (
                      <>
                        {Object.keys(selectedTwigProps.properties).length >
                        0 ? (
                          <>
                            <tr>
                              <th>property Name</th>
                              <th>property value</th>
                            </tr>
                            {Object.keys(selectedTwigProps.properties).map(
                              (prop) => (
                                <tr>
                                  <td>
                                    {prop}{" "}
                                    <button
                                      className="delete-prop-btn"
                                      onClick={() => {
                                        setDisplay(true);
                                        setDeleteItemData({
                                          url:
                                            "properties/twigs/propKey/delete",
                                          data: {
                                            email: UserData.email,
                                            prop_key_id: Number(
                                              Object.keys(propsList)[
                                                Object.values(
                                                  propsList
                                                ).indexOf(prop)
                                              ]
                                            ),
                                          },
                                          selected: { name: prop },
                                          label: "prop",
                                        });
                                      }}
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>

                                  <td>
                                    {selectedTwigProps.properties[prop]}

                                    <button
                                      className="delete-prop-value"
                                      onClick={() => {
                                        setDisplay(true);
                                        setDeleteItemData({
                                          url:
                                            "properties/twigs/propKey/value/delete",
                                          data: {
                                            email: UserData.email,
                                            value_id: Number(
                                              selectedTwigProps.ids[prop]
                                            ),
                                          },
                                          selected: { name: prop },
                                          label: "prop",
                                        });
                                      }}
                                    >
                                      <FaTimes />
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </>
                        ) : (
                          <tr>
                            <td>
                              No properties present{" "}
                              <button>
                                +add props to {TwigsData[selectedTwig]}
                              </button>
                            </td>
                          </tr>
                        )}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>
                            Select a Twig to view props{" "}
                            <button>+add props to twig</button>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {propForm && (
        <div className="twigs-form-container props-from-container">
          <div className="twigs-form-main props-form-main">
            <h2>
              Props <button onClick={() => setPropForm(false)}>X</button>
            </h2>
            <form method="POST" onSubmit={addPropstoTwig}>
              <div className="form-input-group">
                <label>select the prop you would like to add</label>
                <select id="props-name">
                  {Object.keys(selectedTwigProps).length > 0 &&
                    Object.values(propsList).map((x) =>
                      Object.keys(selectedTwigProps.properties).includes(x) ? (
                        <option disabled={true}>{x}</option>
                      ) : (
                        <option>{x}</option>
                      )
                    )}
                </select>
              </div>
              <div className="form-input-group">
                <label>Prop Value</label>
                <input id="props-value" placeholder="Prop value  " />
              </div>
              <hr />
              <button type="submit">Add</button>
            </form>
          </div>
          <Animation />
        </div>
      )}

      <DeleteSynapsForm
        display={display}
        userEmail={UserData.email}
        setDisplay={setDisplay}
        url={deleteItemData.url}
        data={deleteItemData.data}
        selected={deleteItemData.selected}
        dropDown={false}
        label={deleteItemData.label}
      />
    </>
  );
}
