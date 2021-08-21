import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./components/Input";
import { LoginValues } from "./components/values";
import { useHistory } from "react-router-dom";
// import SynapsPage from "./../synaps/SynapsPage";

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
    console.log(loginDetails);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    const animationContainer = document.getElementById("animation-container");
    const error_msg = document.querySelector("#error-msg");
    const loginFormContainer = document.querySelector(".login-form");
    const emailVerificationElement = document.querySelector(
      ".email-verification"
    );
    // animationContainer.style.visibility = "visible";

    fetch("https://neurontech.herokuapp.com/accounts/signin/", {
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
        loginFormContainer.classList.add("hide");
        emailVerificationElement.classList.add("active");
        // history.push("/admin/");
        // setTimeout(() => {
        //   history.push("/admin/");
        // }, 100);
      });

    console.log(loginDetails);
  };
  const OTPVerification = (e) => {
    e.preventDefault();
    const loginFormContainer = document.querySelector(".login-form");
    const emailVerificationElement = document.querySelector(
      ".email-verification"
    );

    fetch("https://neurontech.herokuapp.com/accounts/verify_mail_signin/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: loginDetails.email,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (!Object.keys(resp).pop().toLocaleLowerCase().includes("error")) {
          loginFormContainer.classList.add("hide");
          emailVerificationElement.classList.add("active");
        } else {
          alert(resp["Error"]);
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
          <div className="login-main">
            <form method="post" className="login-form">
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
              {/* <input
                value="submit"
                className="login-btn"
                type="submit"
              /> */}
              <button
                className="login-btn"
                type="submit"
                onClick={OTPVerification}
              >
                submit
              </button>
            </form>
            <div className="email-verification">
              <p>OTP has been sent to your registered email</p>
              <Input
                type="text"
                label="Enter Your OTP"
                name="logon-otp"
                id="otp"
                placeholder="Enter the OTP"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="login-btn"
                onSubmit={handleSubmit}
              >
                verify
              </button>
            </div>
          </div>
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
