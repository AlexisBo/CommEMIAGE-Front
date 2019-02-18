import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreationModule from "./CreationModule";
import ChoixModuleSemestre from "./ChoixModuleSemestre";
import CreationFiliere from "./CreationFiliere";
import InscriptionApprenant from "./InscriptionApprenant";
import AttributionTuteur from "./AttributionTuteur";

const Path = () => (
  <Router>
    <div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/">Home</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/creationmodule">Création module</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/creationfiliere">Création filière</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/attributiontuteur">Attribution tuteur</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/inscriptionapprenant">S'inscrire</Link></u>
        </li>
        <li className="list-inline-item">
          <u style={{color: "blue"}}><Link to="/choixmodulesemestre">Choix modules</Link></u>
        </li>
      </ul>
      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/creationmodule" component={CreationModule} />
      <Route path="/creationfiliere" component={CreationFiliere} />
      <Route path="/attributiontuteur" component={AttributionTuteur} />
      <Route path="/inscriptionapprenant" component={InscriptionApprenant} />
      <Route path="/choixmodulesemestre" component={ChoixModuleSemestre} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default Path;
