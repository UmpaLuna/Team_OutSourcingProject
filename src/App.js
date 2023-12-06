import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import login from "./page/login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={login} />
      </Switch>
    </Router>
  );
}

export default App;
