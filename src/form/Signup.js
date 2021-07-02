import React, { useState, useEffect } from "react";
import "./../css/form.css";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./components/Input";
import Select from "./components/Select";
import signupFields from "./components/values";
export default function Signup({ open, setState, redirect }) {
  //   const [signup, setsignup] = useState(open);
  const init = {
    first_name: "",
    second_name: "",
    email: "",
    password1: "",
    password2: "",
    userToken: "",
    knoxTablePassword: "",
    userCompanyName: "",
    userCountry: "",
    NoOfEmpInUser: "",
    NoOfCustomersInUser: "",
    WhoCreatedAccount: "",
    ContactNumber: "",
    OurServiseRequired: "",
    FieldOfCustomerApp: "",
    CustomerDomain: "",
    HowDoTheyKnowUs: "",
    AgreementStatus: false,
    KnoxTableId: 13,
    AccoundCreated: null,
    AccoundLastlyUbdated: null,
  };
  const [signupDetails, setSignupDeatils] = useState(init);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    if (document.getElementById("signup-btn")) {
      if (!error && signupDetails.AgreementStatus === true) {
        document.getElementById("signup-btn").disabled = false;
        console.log(document.getElementById("signup-btn"));
      } else {
        document.getElementById("signup-btn").disabled = true;
      }
      // Password Validation
      if (
        document.getElementById("password1").value !== "" &&
        document.getElementById("password1").value !==
          document.getElementById("password2").value
      ) {
        document.querySelector(".password1-error").innerHTML =
          "password doesn't match";
        document.querySelector(".password2-error").innerHTML =
          "password doesn't match";
      } else {
        document.querySelector(".password1-error").innerHTML = "";
        document.querySelector(".password2-error").innerHTML = "";
      }
      // Email Validation
      if (
        !(
          document.getElementById("email").value.includes(".") &&
          document.getElementById("email").value.includes("@")
        ) &&
        document.getElementById("email").value !== ""
      ) {
        document.querySelector(".email-error").innerHTML =
          "Invalid email address";
      } else {
        document.querySelector(".email-error").innerHTML = "";
      }

      // First Name Vaidation
      if (document.getElementById("first_name").value.length > 25) {
        document.getElementById("first_name-error").innerHTML =
          "characater limt reached";
        setError(true);
      } else {
        document.getElementById("first_name-error").innerHTML = "";
        setError(false);
      }
      // second name validation
      if (document.getElementById("second_name").value.length > 25) {
        document.getElementById("second_name-error").innerHTML =
          "characater limt reached";
        setError(true);
      } else {
        document.getElementById("second_name-error").innerHTML = "";
        setError(false);
      }
      // Username validation
      if (document.getElementById("email").value.length > 50) {
        document.getElementById("email-error").innerHTML =
          "characater limt reached";
        setError(true);
      } else {
        document.getElementById("email-error").innerHTML = "";
        setError(false);
      }
      // company name validation
      if (document.getElementById("userCompanyName").value.length > 25) {
        document.getElementById("userCompanyName-error").innerHTML =
          "characater limt reached";
        setError(true);
      } else {
        document.getElementById("userCompanyName-error").innerHTML = "";
        setError(false);
      }
      // Domain validation
      if (document.getElementById("CustomerDomain").value.length > 5) {
        document.getElementById("CustomerDomain-error").innerHTML =
          "characater limt reached";
        setError(true);
      } else {
        document.getElementById("CustomerDomain-error").innerHTML = "";
        setError(false);
      }
    }
  });

  const HandleUpdate = (e) => {
    // console.log(e.target.name, e.target.value);

    // console.log("type", e.target.type, e.target.checked);
    if (e.target.type === "checkbox") {
      // alert("yes");
      setSignupDeatils((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setSignupDeatils((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    // console.log(signupDetails);
    setRegister({
      username: signupDetails.email,
      email: signupDetails.email,
      password: signupDetails.password1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("animation-container").style.visibility = "visible";
    // console.log(register);
    const d = new Date();
    const AccData = {
      first_name: signupDetails.first_name,
      second_name: signupDetails.second_name,
      userName: signupDetails.email,
      email: signupDetails.email,
      userToken: signupDetails.userToken,
      knoxTablePassword: signupDetails.knoxTablePassword,
      userCompanyName: signupDetails.userCompanyName,
      userCountry: signupDetails.userCountry,
      NoOfEmpInUser: signupDetails.NoOfEmpInUser,
      NoOfCustomersInUser: signupDetails.NoOfCustomersInUser,
      WhoCreatedAccount: signupDetails.WhoCreatedAccount,
      ContactNumber: signupDetails.ContactNumber,
      OurServiseRequired: signupDetails.OurServiseRequired,
      FieldOfCustomerApp: signupDetails.FieldOfCustomerApp,
      CustomerDomain: signupDetails.CustomerDomain,
      HowDoTheyKnowUs: signupDetails.HowDoTheyKnowUs,
      AgreementStatus: signupDetails.AgreementStatus,
      knoxTableId: "",
      // AccoundCreated: "2012-09-04 06:00:00.000000",
      // AccoundLastlyUbdated: "2012-09-04 06:00:00.000000",
      AccoundCreated:
        d.getFullYear() +
        "-" +
        d.getMonth() +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds(),
      AccoundLastlyUbdated:
        d.getFullYear() +
        "-" +
        d.getMonth() +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds(),
    };
    var status = 0;
    fetch("https://neuron-dev.herokuapp.com/security/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    })
      .then((response) => {
        if (response.ok) {
          // alert("successful request");
        } else {
          // alert("request failed");
        }
        return response.json();
      })
      .then((resp) => {
        status = 1;
        console.log(resp);
        localStorage.setItem("userToken", resp["token"]);
        setSignupDeatils((prevState) => ({
          ...prevState,
          username: resp["user"]["username"],
          knoxTablePassword: resp["user"]["password"],
          userToken: resp["token"],
        }));
        // console.log(resp["user"]["password"], resp["token"]);
        // console.log("register", signupDetails);
        AccData["knoxTablePassword"] = resp["user"]["password"];
        AccData["userToken"] = resp["token"];
        AccData["userName"] = resp["user"]["username"];
        AccData["knoxTableId"] = resp["user"]["id"];
      });
    // .catch((e) => alert(e));
    // console.log(status);

    const timer = setInterval(() => {
      if (status === 1) {
        clearInterval(timer);
        fetch("https://neuron-dev.herokuapp.com/accounts/details/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(AccData),
        })
          .then((response) => {
            if (response.ok) {
              console.log("successful request");
              setTimeout(() => {
                document.getElementById(
                  "animation-container"
                ).style.visibility = "hidden";

                setState(false);
                redirect(true);
              }, 2000);
            } else {
              console.warn("request t acc deatils failed");
            }
            return response.json();
          })
          .then((resp) => console.log(resp));
      } else {
        // console.log("waiting for response....");
      }
    }, 1000);
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
          <div></div>
          <form method="post" onSubmit={handleSubmit}>
            {signupFields.map((field) => {
              const element = field["Element"] === "input" ? "input" : "select";
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
              ) : element === "select" ? (
                <Select
                  key={field["label"]}
                  name={field["name"]}
                  id={field["id"]}
                  label={field["label"]}
                  value={field["value"]}
                  onChange={HandleUpdate}
                />
              ) : null;
            })}

            <div className="form-footer">
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="AgreementStatus"
                  onChange={HandleUpdate}
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
