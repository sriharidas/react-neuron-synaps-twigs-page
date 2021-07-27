import React, { useState, useEffect } from "react";

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
  useEffect(() => {
    if (Object.keys(TwigsData).length < 0) {
      return;
    }
    Object.keys(TwigsData).forEach((x) => {
      const data = JSON.stringify({
        email: UserData.email,
        twig_id: Number(x),
        twig_name: TwigsData[x],
      });
      // console.log(data);
      fetch("/twigs/get/synapses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((resp) => resp.json())
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
        });
    });
    setloaded(true);
  }, [TwigsData, UserData]);
  useEffect(() => {
    if (selectedTwig === "") return;
    console.log(TwigsData[selectedTwig]);
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
      });
  }, [selectedTwig]);
  const addPropstoTwig = (e) => {
    e.preventDefault();
    const prop_name = document.querySelector("#props-name").value;
    const prop_value = document.querySelector("#props-value").value;
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
      .then((resp) => console.log("addes props ?", resp));
    setPropForm(false);
  };
  return (
    <>
      {TwigsandSyanp !== {} && Object.keys(TwigsData).length > 0 && (
        <>
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
                    {props && (
                      <button
                        onClick={() => {
                          console.log("select a prop", propsList);
                          setPropForm(true);
                        }}
                      >
                        {" "}
                        +{" "}
                      </button>
                    )}
                  </td>
                  {!props && (
                    <td>
                      <select onChange={AddSynaps}>
                        {isloaded &&
                        Object.keys(TwigsandSyanp).length ===
                          Object.keys(TwigsData).length &&
                        Object.keys(TwigsandSyanp[x]).pop() !== "result" ? (
                          <>
                            {Object.keys(TwigsandSyanp[x]).map((data) => (
                              <option selected={true}>
                                {data + " - " + TwigsandSyanp[x][data]}
                              </option>
                            ))}
                          </>
                        ) : (
                          <option>None</option>
                        )}
                        <option value={"add-" + x}> + Add Synap</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {props && (
            <>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Props</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(selectedTwigProps).length > 0 ? (
                    <>
                      {Object.keys(selectedTwigProps.properties).length > 0 ? (
                        <>
                          <tr>
                            <th>property Name</th>
                            <th>property value</th>
                          </tr>
                          {Object.keys(selectedTwigProps.properties).map(
                            (prop) => (
                              <tr>
                                <td>{prop}</td>

                                <td>{selectedTwigProps.properties[prop]}</td>
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
              {propForm && (
                <div className="twigs-form-container props-from-container">
                  <div className="twigs-form-main props-form-main">
                    <h2>
                      Props{" "}
                      <button onClick={() => setPropForm(false)}>X</button>
                    </h2>
                    <form method="POST" onSubmit={addPropstoTwig}>
                      <div className="form-input-group">
                        <label>select the prop you would like to add</label>
                        <select id="props-name">
                          {Object.keys(selectedTwigProps).length > 0 &&
                            Object.values(propsList).map((x) =>
                              Object.keys(
                                selectedTwigProps.properties
                              ).includes(x) ? (
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
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
