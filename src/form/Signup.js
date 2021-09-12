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
import { useHistory } from "react-router";
export default function Signup({ open, setState, redirect }) {
  //   const [signup, setsignup] = useState(open);

  const [signupDetails, setSignupDeatils] = useState("");
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [Status, SetStatus] = useState(true);
  const [checked, setChecked] = useState(false);
  const [Error, setError] = useState(false);
  const [verifcation, setVerification] = useState({
    form: false,
    verified: false,
    disbaleBtn: false,
    resend: false,
  });
  const history = useHistory();
  useEffect(() => {
    if (open && document.getElementById("password1") !== undefined) {
      const password = document.querySelector("#password1");
      const confirm_password = document.querySelector("#password2");
      const password_error = document.querySelector(".password1-error");
      const confirm_password_error = document.querySelector(".password2-error");
      if (password.value.length > 0 || confirm_password.value.length > 0)
        if (password !== confirm_password) {
          confirm_password_error.innerHTML = "Password doesn't match";
          password_error.innerHTML = "Password doesn't match";
          console.log(confirm_password_error);
          setError(false);
        } else {
          confirm_password_error.innerHTML = "";
          setError(true);
        }
      if (password.value.length > 0) {
        // password length validation
        if (password.value.length < 8) {
          password_error.innerHTML = "Minimum 8 characters required";
          setError(false);
        } else {
          password_error.innerHTML = "";
          setError(true);
        }
        // passwords matching validation
      }
      if (confirm_password.value.length > 0) {
        // confrim password length validation
        if (confirm_password.value.length < 8) {
          confirm_password_error.innerHTML = "Minimum 8 characters required";
          setError(false);
        } else {
          confirm_password_error.innerHTML = "";
          setError(true);
        }
      }
    }
  }, [signupDetails]);

  useEffect(() => {
    if (signupDetails.email !== "" && verifcation.form) {
      let data = signupDetails.email;
      console.log("verify", data);
      fetch("https://neurontech.herokuapp.com/accounts/verify_mail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    }
    if (verifcation.form || verifcation.resend) {
      setVerification((prevState) => ({
        ...prevState,
        disbaleBtn: false,
        resend: false,
      }));
      const timerContainer = document.querySelector("#timer");
      const otp_msg = document.querySelector("#otp-timer");
      const otp_err = document.querySelector("#otp-error");

      let date = new Date(),
        start,
        max;
      max = new Date(120000); // date object with 2 mins (timer)
      start = date.getTime(); // start time
      const verificationTimer = setInterval(() => {
        let d = new Date(); // current time
        let now = new Date(d.getTime() - start); // time difference
        let diff_minutes = max.getMinutes() - now.getMinutes(),
          diff_seconds = max.getSeconds() - now.getSeconds(),
          minutes,
          seconds;
        minutes = diff_minutes < 1 ? diff_minutes : diff_minutes - 1;
        seconds = diff_minutes < 1 ? diff_seconds : diff_seconds + 60;
        // clear interval when timer reaches 00:00
        if (minutes <= 0 && seconds <= 0) {
          clearInterval(verificationTimer);
          setVerification((prevState) => ({
            ...prevState,
            disbaleBtn: true,
          }));
          if (!verifcation.resend && otp_err !== undefined)
            otp_err.innerHTML = "OTP expired";
        }
        if (timerContainer !== undefined)
          timerContainer.innerHTML = `${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`;
        // console.log(now);
      }, 1000);
    }
  }, [verifcation.form, verifcation.resend, signupDetails.email]);

  const HandleUpdate = (e) => {
    console.log(e.target.name, e.target.value);

    // console.log("type", e.target.type, e.target.checked);

    setSignupDeatils((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    console.log(signupDetails);
    // setRegister({
    //   username: signupDetails.email,
    //   email: signupDetails.email,
    //   password: signupDetails.password1,
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    document.getElementById("animation-container").style.visibility = "visible";
    // console.log(register);
    console.log(JSON.stringify(signupDetails));
    const animationContainer = document.getElementById("animation-container");
    const alertMessageContainer = document.querySelector(
      ".alert-message-container"
    );
    const alertMessage = document.querySelector(".alert-message");
    const alertText = document.querySelector(".alert-text");

    fetch("https://neurontech.herokuapp.com/accounts/signup/", {
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
        if (Object.keys(resp) === "error") {
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
          setState(false);
          redirect(true);
        }, 1000);
        console.log(resp);
      });
  };

  const verifyOtp = () => {};
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
                  setVerification={setVerification}
                  isVerified={verifcation.verified}
                  others={field["other"]}
                />
              ) : (
                <Select
                  key={field["label"]}
                  name={field["name"]}
                  id={field["id"]}
                  label={field["label"]}
                  value={field["value"]}
                  // onChange={HandleUpdate}
                  disabled={field["disabled"]}
                />
              );
            })}

            <div className="form-footer">
              {verifcation.form && (
                <div className="form-verification">
                  <h3>OTP verification</h3>
                  <Input
                    type="input"
                    name="otp"
                    id="otp"
                    label="Please enter the OTP for verification"
                    autoFocus={true}
                    placeholder="Enter the OTP"
                    onChange={HandleUpdate}
                  />
                  <div>
                    <button
                      type="button"
                      disabled={verifcation.disbaleBtn}
                      onClick={() => {
                        verifyOtp();
                        setVerification((prevState) => ({
                          ...prevState,
                          verified: true,
                          form: false,
                        }));
                      }}
                    >
                      verify
                    </button>
                    {verifcation.disbaleBtn && (
                      <button
                        type="button"
                        onClick={() =>
                          setVerification((prevState) => ({
                            ...prevState,
                            resend: true,
                          }))
                        }
                      >
                        Resend
                      </button>
                    )}
                  </div>
                  <p id="otp-timer">
                    OTP will expire after <span id="timer"> 02:00 </span> mins
                  </p>
                  {!verifcation.resend && <p id="otp-error"></p>}
                </div>
              )}
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="AgreementStatus"
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                  // onChange={HandleUpdate}
                />

                <span>
                  <label htmlFor="terms">
                    &nbsp;Accept to Our Terms and Conditions
                  </label>
                </span>
              </div>
              {/* <p style={errorMsg}>Password doesn't match</p> */}
              <input
                type="submit"
                value="Sign Up"
                id="signup-btn"
                disabled={!(checked && Error && verifcation.verified)}
              />
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
