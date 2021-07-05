import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export default function UserProfile() {
  const [data, SetData] = useState("");
  const [fields, setFields] = useState("");
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    fetch(
      "https://neuron-dev.herokuapp.com/accounts/admin_panel/user_profile_details/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: localStorage.getItem("userToken"),
          // userToken: 12345,
        }),
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        SetData(resp);
        setFields(Object.keys(resp));
        // if (data !== "") console.log(data);
        // if (fields !== "") console.log(fields);
      });

    if (document.querySelector("#your_secret_Token")) {
      display === true
        ? (document.querySelector("#your_secret_Token").type = "text")
        : (document.querySelector("#your_secret_Token").type = "password");
    }
  });
  return (
    <div className="user-profile">
      {/* {fields !== "" ? fields.map((x) => <p>{data}</p>) : null} */}
      <form>
        {fields !== ""
          ? fields.map((x) => (
              <div className="userprofile-form-groups">
                <label>{x.split("_").join(" ")}</label>
                {x === "your_secret_Token" ? (
                  <div className="user-profile-pwd">
                    <input
                      type="password"
                      readOnly
                      value={data[x]}
                      id={x}
                      name={x}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDisplay(!display);
                      }}
                    >
                      {display === true ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </button>
                  </div>
                ) : (
                  <input type="text" readOnly value={data[x]} id={x} name={x} />
                )}
              </div>
            ))
          : null}
      </form>
    </div>
  );
}
