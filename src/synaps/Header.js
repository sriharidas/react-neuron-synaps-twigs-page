import React from "react";
import { useHistory } from "react-router";
export default function Header({ title }) {
  const histoy = useHistory();
  return (
    <div className="synaps-header">
      <h3>{title}</h3>
      <div>
        <button onClick={() => histoy.push("/synaps")}>Synaps</button>
        <button onClick={() => histoy.push("/twigs")}>twigs</button>
        <button onClick={() => histoy.push("/bonding")}>props</button>
      </div>
    </div>
  );
}
