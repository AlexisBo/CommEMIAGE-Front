import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreationModule from "./CreationModule";
import InscriptionApprenant from "./InscriptionApprenant";

const Path = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/creationmodule">Création module</Link>
        </li>
        <li>
          <Link to="/inscriptionapprenant">S'inscrire</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/creationmodule" component={CreationModule} />
      <Route path="/inscriptionapprenant" component={InscriptionApprenant} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default Path;
