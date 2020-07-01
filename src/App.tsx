import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { useGlobalState } from "react-global-state-hook";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "./components/Auth";
import { Profile } from "./pages/Profile"
import { Header } from "./components/Header"

function App() {
  const [signedIn] = useGlobalState("SIGNED_IN", false);

  return (
    <div className="app">
      <Router>
        <Header />
        {signedIn ? (
          <Switch>
            <Route path="/auth/:type" component={Auth} />
            <Route path="/profile" component={Profile} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/auth/:type" component={Auth} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
