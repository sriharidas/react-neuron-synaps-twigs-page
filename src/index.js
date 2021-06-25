import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
// import Login from "./form/Login";
import Admin from "./admin/Admin";
export default function Index() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/admin" component={Admin} />
        </Switch>
        {/* <App />
        <Login /> */}
      </Router>
    </>
  );
}
ReactDOM.render(<Index />, document.getElementById("root"));
