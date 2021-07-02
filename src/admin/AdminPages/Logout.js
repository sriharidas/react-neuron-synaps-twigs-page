import React, { useEffect } from "react";
import { useHistory } from "react-router";
export default function Logout() {
  const history = useHistory();
  useEffect(() => {
    const token = "Token " + localStorage.getItem("userToken");
    setTimeout(() => {
      history.push("/");
    }, 1000);

    // console.log(token, typeof token);
    localStorage.removeItem("userToken");

    // fetch("https://neuron-dev.herokuapp.com/security/logout", {
    //   method: "POST",

    //   headers: {
    //     Authorization:
    //       "Token b1fcb66fe53d950db11cb04724fca06bad7de457bd6650d61f5c31d77ed8f8e7",
    //   },
    // }).then((resp) => console.log(resp));
  }, []);
  return <div></div>;
}
