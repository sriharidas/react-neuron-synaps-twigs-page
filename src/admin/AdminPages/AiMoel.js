import React from "react";
import SynapsContainer from "./synaps/SynapsContainer";
import TwigsContainer from "./twigs/TwigsContainer";
import PropsContainer from "./bonding/PropsContainer";
export default function AiMoel() {
  return (
    <div>
      <SynapsContainer />
      <TwigsContainer />
      <PropsContainer />
    </div>
  );
}
