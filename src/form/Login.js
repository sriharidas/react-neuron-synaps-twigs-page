import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./components/Input";
import { LoginValues } from "./components/values";
export default function Login({ open, setState, redirect }) {
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

          <form>
            {LoginValues.map((field) => (
              <Input
                type={field["type"]}
                label={field["label"]}
                name={field["name"]}
                id={field["id"]}
                placeholder={field["placeholder"]}
                key={field["id"]}
              />
            ))}
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
