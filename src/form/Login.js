import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./components/Input";
import { LoginValues } from "./components/values";
import { useHistory } from "react-router-dom";
export default function Login({ open, setState, redirect }) {
  const initialValue = {
    username: "",
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
    fetch("https://neuron-dev.herokuapp.com/security/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((Response) => {
        if (Response.ok) console.log("Login Successful request");
        else console.warn("Login request failed");
        return Response.json();
      })
      .then((resp) => {
        console.log("Login Response", resp);
        if (resp["token"]) {
          console.log("valid login");
          // <Redirect to="/admin" />;
          history.push("/admin");
        } else {
          console.warn("invalid login");
          // document.getElementById("error-msg").innerHTML =
          //   "Invalid username or password";
          alert("Invalid username or password");
        }
      });
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
            {/* <p id="error-msg">Error</p> */}
            <span id="forget-pwd">
              <a href="#">Forget Password?</a>
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
