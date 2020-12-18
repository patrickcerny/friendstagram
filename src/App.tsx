import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/Home";

const pages = {
  home: Home,
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            component={() => <pages.home title="Simon Ostini"></pages.home>}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
