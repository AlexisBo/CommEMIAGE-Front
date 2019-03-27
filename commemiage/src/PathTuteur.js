import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SuiviTuteur from "./SuiviTuteur";

function deconnexion () {
  localStorage.clear();
  window.location.reload();
}

const Path = () => (
  <Router>
    <div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/">Home</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/suivituteur">Suivi tuteur</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="" onClick={deconnexion}>Logout</Link></u>
        </li>
      </ul>
      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/suivituteur" component={SuiviTuteur} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default Path;
