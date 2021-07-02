import React, { useState, useEffect } from "react";
import file from "./../../samplecsv.csv";
import Animation from "./../../animation/Animation";
export default function DataCircuit() {
  const [Data, setData] = useState({
    // userToken: localStorage.getItem("userToken"),
    userToken: 123456,
    noOfItems: 0,
    list: {},
  });
  const handleFileSelect = (event) => {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
  };

  var finalItems = {
    // this will be taken from the backend
    noOfItems: 0,
    list: {},
  };
  const handleFileLoad = (event) => {
    // var Datalist = {};
    // console.log(event);

    const fileContent = event.target.result; // reading the content of the uploaded file
    console.log("This is content of the file : ", fileContent);
    const data = fileContent.split("\n").slice(1); //spliting  the each array and return as array
    finalItems.noOfItems = data.length - 1; // finding the number of rows
    for (let i = 0; i < data.length - 1; i++) {
      finalItems.list[i] = data[i];
    }
    console.log(Data);
    setData((prevState) => ({
      ...prevState,
      noOfItems: finalItems.noOfItems,
      list: finalItems.list,
    }));
    console.log(finalItems);
    console.log(JSON.stringify(finalItems));
  };
  useEffect(() => {
    document
      .getElementById("fileInput")
      .addEventListener("change", handleFileSelect, false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("animation-container").style.visibility = "visible";
    const data = {
      userToken: Data.userToken,
      noOfItems: Data.noOfItems,
      list: Data.list,
    };
    console.log(Data);
    console.log(JSON.stringify(Data));
    fetch("https://neuron-dev.herokuapp.com/user_property_database/movies/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (resp.ok) console.log("request sucessful");
        else console.log("request failed");
        return resp.json();
      })
      .then((resp) => {
        if (resp) {
          document.getElementById("animation-container").style.visibility =
            "hidden";
        }
        console.log(resp);
      })
      .catch((e) => console.warn(e));
  };
  return (
    <>
      {/* <h2>Upload a</h2> */}
      <form className="datacircuit-container" onSubmit={handleSubmit}>
        <input type="file" id="fileInput" name=" fileInput" accept=".csv" />
        <button type="submit" className="datacircuit-formbtn">
          submit file
        </button>

        <div className="datacircuit-downloadtext">
          Download sample csv&nbsp;
          <a href={file} download className="datacircuit-downloadlink">
            download
          </a>
        </div>
        <Animation />
      </form>
    </>
  );
}

// const downloadText = {
//   marginTop: "10px",
//   borderTop: "1px solid #000",
//   paddingTop: "10px",
//   textAlign: "center",
//   width: "290px",
// };
// const downloadLink = {
//   color: "#3a3aff",
// };
