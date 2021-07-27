import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
// import Login from "./form/Login";
import Admin from "./admin/Admin";
import DocumentationContainer from "./Documentation/DocumentationContainer";
// import SynapsPage from "./synaps/SynapsPage";
import SynapsContainer from "./synaps/SynapsContainer";
import TwigsContainer from "./twigs/TwigsContainer";
import PropsContainer from "./bonding/PropsContainer";
export default function Index() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/admin" component={Admin} />
          <Route
            exact
            path="/documentation"
            component={DocumentationContainer}
          />
          <Route path="/synaps" exact component={SynapsContainer} />
          <Route path="/twigs" exact component={TwigsContainer} />
          <Route path="/bonding" exact component={PropsContainer} />
        </Switch>
        {/* <App />
        <Login /> */}
      </Router>
    </>
  );
}
ReactDOM.render(<Index />, document.getElementById("root"));
