import React, { useState, useEffect } from "react";
import file from "./../../samplecsv.csv";
import Animation from "./../../animation/Animation";
import { GrAdd } from "react-icons/gr";
export default function DataCircuit() {
  const [Data, setData] = useState({
    // userToken:
    //   "c81e04cd58af886fecf097728764819364ff9138730e4b791841e2b06f9196e3",
    // userToken: 12345,
    userToken: localStorage.getItem("userToken"),
    noOfItems: 0,
    list: {},
  });
  const [UploadMovies, setUploadMovie] = useState(false);
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

    const data = fileContent.split("\n"); //spliting  the each array and return as array
    data.pop();
    finalItems.noOfItems = data.length; // finding the number of rows
    for (let i = 0; i < data.length; i++) {
      finalItems.list[i] = data[i];
      console.log(data[i]);
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
    if (document.getElementById("animation-container")) {
      document.getElementById("animation-container").style.visibility =
        "visible";
      document
        .getElementById("fileInput")
        .addEventListener("change", handleFileSelect, false);
      fetch(
        "https://neuron-dev.herokuapp.com/user_property_database/movies/get",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            // userToken: 123456,
          }),
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp["result"]);
          const userData = resp["result"];
          document.getElementById("animation-container").style.visibility =
            "hidden";
          if (userData.length > 0) {
            setUploadMovie(true);
            document.getElementById("user-table").innerHTML = "";
            const Header = document.createElement("H3");
            Header.setAttribute("class", "user-data-title");
            Header.append(document.createTextNode("Movies data"));
            document.getElementById("user-table").append(Header);
            const tableContainer = document.createElement("TABLE");
            tableContainer.setAttribute("id", "user-table-list");
            const Headers = ["Movie name", "Released Year", "Genre"];
            const tableHeader = document.createElement("TR");
            const tableHead = document.createElement("THEAD");
            Headers.map((title, index) => {
              const TableTitle = document.createElement("TH");
              const TableTitleValue = document.createTextNode(title);
              TableTitle.append(TableTitleValue);
              tableHeader.append(TableTitle);
              // console.log()
            });
            const tableBody = document.createElement("TBODY");
            userData.map((value) => {
              // console.log(value.split(",,"));
              const tablerow = document.createElement("TR");
              value.split(",,").map((data) => {
                // console.log(data);
                const tableData = document.createElement("TD");
                tableData.append(document.createTextNode(data));
                tablerow.append(tableData);
              });
              tableBody.append(tablerow);
              console.log(tablerow);
            });
            // tableContainer.append(tableHeader);
            tableHead.append(tableHeader);
            tableContainer.append(tableHead);
            tableContainer.append(tableBody);
            document.getElementById("user-table").append(tableContainer);
          } else {
            setUploadMovie(false);
          }
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("animation-container").style.visibility = "visible";
    const data = JSON.stringify({
      userToken: Data.userToken,
      noOfItems: Data.noOfItems,
      list: Data.list,
    });
    console.log("State", Data);
    console.log(data);
    console.log(JSON.stringify(data));

    fetch(
      "https://neuron-dev.herokuapp.com/user_property_database/movies/post",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: data,
      }
    )
      .then((resp) => {
        if (resp.ok) console.log("request sucessful");
        else console.log("request failed");
        document.getElementById("animation-container").style.visibility =
          "hidden";
        return resp.json();
      })
      .then((resp) => {
        if (resp) {
        }
        console.log(resp);
      })
      .catch((e) => console.warn(e));
  };
  return (
    <>
      {/* <h2>Upload a</h2> */}
      <div className="datacircuit-container">
        <div id="user-table">No data to display</div>
        {/* <hr /> */}
        {true && (
          <form onSubmit={handleSubmit}>
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
        )}
      </div>
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
