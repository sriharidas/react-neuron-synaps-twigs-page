import React, { useState, useEffect } from "react";
// import "./../../css/form.css";
export default function DataCircuit() {
  // useEffect(() => {

  // }, []);

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
    finalItems.noOfItems = data.length; // finding the number of rows
    for (let i = 0; i < data.length; i++) {
      finalItems.list[i] = data[i];
    }
    // const timer = setInterval(() => {
    //   if (finalItems.list[0]) {
    //     setData(finalItems);
    //     clearInterval(timer);
    //   } else {
    //     console.log("waiting..");
    //   }
    // }, 1000);
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
    const data = {
      userToken: Data.userToken,
      noOfItems: Data.noOfItems,
      list: Data.list,
    };
    console.log(Data);
    console.log(JSON.stringify(Data));
    fetch("http://neuron-dev.herokuapp.com/user_property_database/movies/", {
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
      .then((resp) => console.log(resp))
      .catch((e) => console.warn(e));
  };
  return (
    <>
      {/* <h2>Upload a</h2> */}
      <form style={formContainer} onSubmit={handleSubmit}>
        <input type="file" id="fileInput" name=" fileInput" accept=".csv" />
        <button type="submit" style={formBtn}>
          upload
        </button>
      </form>
    </>
  );
}

const formContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "300px",
  justifyContent: "center",
  textAlign: "left",
};

const formBtn = {
  width: "290px",
  padding: "7px",
  marginTop: "15px",
};
