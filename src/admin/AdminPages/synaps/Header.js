import React from "react";
import { useHistory } from "react-router";
export default function Header({ title }) {
  const history = useHistory();
  return (
    <div className="synaps-header">
      <h2>{title}</h2>
      <div>
        <button onClick={() => history.push("/admin/ai-schema/synaps")}>
          Synaps
        </button>
        <button onClick={() => history.push("/admin/ai-schema/twigs")}>
          twigs
        </button>
        <button onClick={() => history.push("/admin/ai-schema/bonding")}>
          props
        </button>
      </div>
    </div>
  );
}
