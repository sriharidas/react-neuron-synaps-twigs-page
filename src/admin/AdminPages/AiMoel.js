import React from "react";
import SynapsContainer from "./synaps/SynapsContainer";
import TwigsContainer from "./twigs/TwigsContainer";
import PropsContainer from "./bonding/PropsContainer";
import { Route, Switch } from "react-router-dom";
export default function AiMoel() {
  return (
    <Switch>
      <Route
        exact
        path={"/admin/ai-schema/synaps"}
        component={SynapsContainer}
      />
    </Switch>
  );
}
