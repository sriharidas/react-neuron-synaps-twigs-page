import React, { useState, useEffect } from "react";
import "./../css/form.css";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./components/Input";
import Select from "./components/Select";
import { signupFields } from "./components/values";
import { newSignupFields } from "./components/values";
import { GiCondorEmblem } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import DependencyList from "./components/DependencyList";

export default function Signup({ open, setState, redirect }) {
  //   const [signup, setsignup] = useState(open);

  const [signupDetails, setSignupDeatils] = useState("");
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [Status, SetStatus] = useState(true);
  useEffect(() => {
    if (document.getElementById("signup-form") !== undefined) {
      const password = document.getElementById("password1");
      const confirm_password = document.getElementById("password2");
      const password_error = document.querySelector(".password1-error");
      const confirm_password_error = document.querySelector(".password2-error");
      if (
        password !== "" &&
        confirm_password !== "" &&
        password !== confirm_password
      ) {
        // confirm_password_error.innerHTML = "Password doesn't match";
        console.log(confirm_password_error);
      }
    }
  }, [signupDetails]);
  const HandleUpdate = (e) => {
    // console.log(e.target.name, e.target.value);

    // console.log("type", e.target.type, e.target.checked);

    setSignupDeatils((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // console.log(signupDetails);
    // setRegister({
    //   username: signupDetails.email,
    //   email: signupDetails.email,
    //   password: signupDetails.password1,
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.target.reset();
    document.getElementById("animation-container").style.visibility = "visible";
    // console.log(register);
    console.log(JSON.stringify(signupDetails));
    const animationContainer = document.getElementById("animation-container");
    const alertMessageContainer = document.querySelector(
      ".alert-message-container"
    );
    const alertMessage = document.querySelector(".alert-message");
    const alertText = document.querySelector(".alert-text");
    fetch("/accounts/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(signupDetails),
    })
      .then((resp) => {
        if (!resp.ok) {
          alert("Error while creating account");
          animationContainer.style.visibility = "hidden";
        }
        return resp.json();
      })
      .then((resp) => {
        console.log(Object.keys(resp));
        animationContainer.style.visibility = "hidden";
        alertMessageContainer.style.display = "flex";
        if (Object.keys(resp) == "error") {
          SetStatus(false);
          alertText.innerHTML = resp["error"];
          alertMessage.style.color = "#f00";
        } else {
          SetStatus(true);
          alertText.innerHTML = resp[Object.keys(resp)];
          alertMessage.style.color = "#0f0";
        }
        setTimeout(() => {
          alertMessageContainer.style.display = "none";
          // document.querySelector('.alert-text').innerHTML= resp['result']
        }, 5000);
        console.log(resp);
      });
  };

  return (
    open && (
      <div className="form-container">
        <div id="signup-form">
          <div className="form-header">
            <h3>Signup Page</h3>
            <button className="form-close" onClick={() => setState(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="alert-message-container">
            <div id="alert-message" className="alert-message">
              <span className="alert-message-icon">
                {/* <AiOutlineCheckCircle /> */}
                {Status === true ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <MdErrorOutline />
                )}
              </span>
              <span className="alert-text">{/* Account Created */}</span>
              {/* Account Created */}
            </div>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            {newSignupFields.map((field) => {
              const element = field["Element"];
              // console.log(field["Element"], element);
              return element === "input" ? (
                <Input
                  key={field["label"]}
                  type={field["type"]}
                  label={field["label"]}
                  name={field["name"]}
                  id={field["id"]}
                  placeholder={field["placeholder"]}
                  onChange={HandleUpdate}
                />
              ) : (
                <Select
                  key={field["label"]}
                  name={field["name"]}
                  id={field["id"]}
                  label={field["label"]}
                  value={field["value"]}
                  onChange={HandleUpdate}
                  disabled={field["disabled"]}
                />
              );
            })}

            <div className="form-footer">
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="AgreementStatus"
                  // onChange={HandleUpdate}
                />

                <span>
                  <label htmlFor="terms">
                    &nbsp;Accept to Our Terms and Conditions
                  </label>
                </span>
              </div>
              {/* <p style={errorMsg}>Password doesn't match</p> */}
              <input type="submit" value="Sign Up" id="signup-btn" />
              <hr />
              <div className="signup-footer">
                <span>
                  Already have an account? click here to&nbsp;
                  <span>
                    <a
                      href="#"
                      onClick={() => {
                        setState(false);
                        redirect(true);
                      }}
                    >
                      login
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </form>
          {/* <button type="submit" value="Sign Up">
            Sign Up
          </button> */}
        </div>
      </div>
    )
  );
}
// const errorMsg = {
//   margin: "10px 0",
//   color: "red",
// };
