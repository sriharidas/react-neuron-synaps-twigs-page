import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    const token = "Token " + localStorage.getItem("userToken");
    console.log(token);
    fetch("https://neuron-dev.herokuapp.com/security/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Authorization: token,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }, []);
  return <div></div>;
}
