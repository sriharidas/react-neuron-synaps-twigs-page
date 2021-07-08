import React, { useState, useEffect } from "react";
import Select from "./Select";

export default function DependencyList({ data, onChange }) {
  //   console.log("dependency list", data, data.length);
  const [StateData, setData] = useState("");
  const [PrimaryData, SetPrimaryData] = useState("none");

  useEffect(() => {
    var ListOptions = {};
    data.map((x) => {
      ListOptions[x["id"]] = x["value"];
    });
    setData(ListOptions);
  }, []);

  const UpdateState = () => {
    const primaryField = document.getElementById("OurServiseRequired");
    // const secondaryField = document.getElementById("YourServiceType");
    // const TeritaryField = document.getElementById("FieldOfCustomerApp");

    if (primaryField !== null) {
      SetPrimaryData(primaryField.value);
      console.log(PrimaryData);

      if (
        document.getElementById("OurServiseRequired").value === "Recommendation"
      ) {
        setData((prevState) => ({
          ...prevState,
          YourServiceType: ["media"],
          FieldOfCustomerApp: ["movie", "song"],
        }));
        // Disabling songs
        // TeritaryField.options[2].disabled = true;
        // TeritaryField.options[1].disabled = false;
      } else if (
        document.getElementById("OurServiseRequired").value === "Suggestion"
      ) {
        setData((prevState) => ({
          ...prevState,
          YourServiceType: ["Informational"],
          FieldOfCustomerApp: ["education"],
        }));
        // TeritaryField.options[1].disabled = true;
        // secondaryField.options[1].disabled = true;
      } else {
        setData((prevState) => ({
          ...prevState,
          YourServiceType: ["media", "Informational"],
          FieldOfCustomerApp: ["movie", "song", "education"],
        }));
      }

      // disabling options
    }
  };

  return (
    <>
      {StateData !== "" &&
        data.map((element, index) => {
          const Options = StateData[element.id];
          return (
            <Select
              name={element.name}
              id={element.id}
              value={Options}
              label={element.label}
              onChange={(e) => {
                onChange(e);
                UpdateState();
              }}
            />
          );
        })}
    </>
  );
}
