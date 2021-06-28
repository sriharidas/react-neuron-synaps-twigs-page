import React, { useState } from "react";
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
    username: "",
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
  const HandleUpdate = (e) => {
    console.log(e.target.name, e.target.value);

    console.log("type", e.target.type, e.target.checked);
    if (e.target.type === "checkbox") {
      alert("yes");
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
    console.log(signupDetails);
    setRegister({
      username: signupDetails.username,
      email: signupDetails.email,
      password: signupDetails.password1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(register);
    const d = new Date();
    const AccData = {
      first_name: signupDetails.first_name,
      second_name: signupDetails.second_name,
      userName: signupDetails.username,
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
          alert("successful request");
        } else {
          alert("request failed");
        }
        return response.json();
      })
      .then((resp) => {
        status = 1;
        console.log(resp);
        setSignupDeatils((prevState) => ({
          ...prevState,
          username: resp["user"]["username"],
          knoxTablePassword: resp["user"]["password"],
          userToken: resp["token"],
        }));

        console.log(resp["user"]["password"], resp["token"]);
        console.log("register", signupDetails);
        AccData["knoxTablePassword"] = resp["user"]["password"];
        AccData["userToken"] = resp["token"];
        AccData["userName"] = resp["user"]["username"];
        AccData["knoxTableId"] = resp["user"]["id"];
      })
      .catch((e) => alert(e));
    console.log(status);

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
        console.log("waiting for response....");
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
              console.log(field["Element"], element);
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
              <input type="submit" value="Sign Up" />
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
