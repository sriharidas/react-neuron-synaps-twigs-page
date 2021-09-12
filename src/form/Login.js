import React, { useState, useEffect } from "react";
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
  const [isverified, setIsVerified] = useState(false);
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    console.log(e.target);
    setLoginDeatils((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(loginDetails);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";

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
          setError({
            status: true,
            message: resp["Error"],
          });
          return;
        }
        localStorage.setItem("loginData", JSON.stringify(resp));
        setTimeout(() => {
          history.push("/admin/");
        }, 500);
      });

    console.log(loginDetails);
  };
  const sendOTPVerification = (e) => {
    e.preventDefault();
    const animationContainer = document.getElementById("animation-container");
    animationContainer.style.visibility = "visible";
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
        animationContainer.style.visibility = "hidden";

        console.log(resp);
        if (!Object.keys(resp).pop().toLocaleLowerCase().includes("error")) {
          setError({
            status: false,
            message: "",
          });
          setIsOTPsent(true);
        } else {
          setError({
            status: true,
            message: resp["Error"],
          });
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
            {error.status && (
              <p id="error-msg">
                <span>{error.message}</span>
                <i onClick={() => setError({ status: false, message: "" })}>
                  <AiOutlineClose />
                </i>
              </p>
            )}
            {!isOTPsent || isverified ? (
              <form method="post" className="login-form">
                {LoginValues.map((field) => (
                  <Input
                    type={field["type"]}
                    label={field["label"]}
                    name={field["name"]}
                    id={field["id"]}
                    placeholder={field["placeholder"]}
                    key={field["id"]}
                    onChange={handleChange}
                    // isVerified={isverified}
                    // setVerification={setIsVerified}
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
                {isverified ? (
                  <button
                    className="login-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    sign in
                  </button>
                ) : (
                  <button
                    className="login-btn"
                    type="submit"
                    onClick={sendOTPVerification}
                  >
                    Verify your Email
                  </button>
                )}
              </form>
            ) : (
              <div className="email-verification">
                <p>OTP has been sent to your registered email</p>
                <Input
                  type="text"
                  label="Enter Your OTP"
                  name="otp"
                  id="otp"
                  placeholder="Enter the OTP"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="login-btn"
                  // onClick={() => {
                  //   setIsVerified(true);
                  // }}
                  onClick={handleSubmit}
                >
                  verify
                </button>
              </div>
            )}
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
