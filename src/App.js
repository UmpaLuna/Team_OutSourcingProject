import React from "react";
<<<<<<< HEAD
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
=======
import Router from "./router/Router";

function App() {
  return <Router />;
>>>>>>> 15ac6733907660e38288a9cfcb7cddf5a61bb559
}

export default App;
