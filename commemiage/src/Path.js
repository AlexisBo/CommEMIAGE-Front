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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/creationmodule">Création module</Link>
        </li>
        <li>
          <Link to="/creationfiliere">Création filière</Link>
        </li>
        <li>
          <Link to="/attributiontuteur">Attribution tuteur</Link>
        </li>
        <li>
          <Link to="/inscriptionapprenant">S'inscrire</Link>
        </li>
        <li>
          <Link to="/choixmodulesemestre">Choix modules</Link>
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
