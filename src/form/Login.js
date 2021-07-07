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
    document.getElementById("animation-container").style.visibility = "visible";
    console.log(document.getElementById("animation-container"));
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
        document.getElementById("animation-container").style.visibility =
          "hidden";

        console.log("Login Response", resp);
        if (resp["token"]) {
          console.log("valid login");
          // localStorage.setItem("userToken", resp["Token"]);
          // history.push("/admin");
          fetch("https://neuron-dev.herokuapp.com/security/usertoken/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginDetails.username,
            }),
          })
            .then((resp) => resp.json())
            .then((resp) => {
              console.log("key", resp);
              localStorage.setItem("userToken", resp["Token"]);
              history.push("/admin");
            });
        } else {
          console.warn("invalid login");
          // document.getElementById("error-msg").innerHTML =
          //   "Invalid username or password";
          // document.getElementById("animation-container").style.display = "none";

          // alert("Invalid username or password");
          document.getElementById("error-msg").innerHTML =
            "Invalid Username or Password";
          document.getElementById("error-msg").style = {
            padding: "10px",
          };
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
