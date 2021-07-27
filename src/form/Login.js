import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./components/Input";
import { LoginValues } from "./components/values";
import { useHistory } from "react-router-dom";
import SynapsPage from "./../synaps/SynapsPage";

export default function Login({ open, setState, redirect }) {
  // console.log(open, redirect, setState);
  const initialValue = {
    email: "",
    password: "",
  };
  const [loginDetails, setLoginDeatils] = useState(initialValue);
  const history = useHistory();
  const handleChange = (e) => {
    setLoginDeatils((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // e.target.reset();
    const animationContainer = document.getElementById("animation-container");
    const error_msg = document.querySelector("#error-msg");
    animationContainer.style.visibility = "visible";
    fetch("/accounts/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        animationContainer.style.visibility = "hidden";
        console.log(resp);
        if (Object.keys(resp).shift() === "Error") {
          error_msg.innerHTML = resp["Error"];
          error_msg.style = "color:red; background: #f888; padding: 10px;";
          return;
        }
        error_msg.innerHTML = resp[Object.keys(resp).shift()]
          .split("_")
          .join(" ");
        error_msg.style = "color:green; background: #0f08; padding: 10px;";
        localStorage.setItem("loginData", JSON.stringify(resp));
        setTimeout(() => {
          history.push("/synaps");
        }, 3000);
      });
    console.log(loginDetails);
  };
  return (
    open && (
      <div className="form-container ">
        <div id="login-form">
          <div className="form-header">
            <h3>Login Page</h3>
            <button className="form-close" onClick={() => setState(false)}>
              <AiOutlineClose />
            </button>
          </div>

          <form onSubmit={handleSubmit} method="post">
            <p id="error-msg"></p>

            {LoginValues.map((field) => (
              <Input
                type={field["type"]}
                label={field["label"]}
                name={field["name"]}
                id={field["id"]}
                placeholder={field["placeholder"]}
                key={field["id"]}
                onChange={handleChange}
              />
            ))}
            <span id="forget-pwd">
              {/* <a href="#">Forget Password?</a> */}
            </span>
            <input type="submit" value="submit" />
          </form>
          <hr />
          <div className="login-footer">
            <span>
              Create a new account. click here to{" "}
              <a
                href="#"
                onClick={() => {
                  setState(false);
                  redirect(true);
                }}
              >
                signup
              </a>
            </span>
          </div>
        </div>
      </div>
    )
  );
}
