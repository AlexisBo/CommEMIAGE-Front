import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChoixModuleSemestre from "./ChoixModuleSemestre";
import DashboardApprenant from "./DashboardApprenant";

function deconnexion () {
  localStorage.clear();
  window.location.href();
}

const Path = () => (
  <Router>
    <div>


    <div className="ashier">  
      <div className="navbar navbar-expand-md navbar-dark bg-indigo navbar-static">
        <div className="navbar-brand">
          <img src={require('./ressources/images/logo_light.png')}/>
        </div>
        
        <div className="d-md-none">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                <i className="icon-tree5"></i>
            </button>
            <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                <i className="icon-paragraph-justify3"></i>
            </button>
        </div>

        <div className="collapse navbar-collapse" id="navbar-mobile">
            <ul className="navbar-nav lst">			
              <li className="itemlst">
                <Link to="/dashboard"><i className="icon-users"></i>Dashboard</Link>
              </li>
              <li className="itemlst">
                <Link to="/choixmodulesemestre"><i className="icon-users"></i>Choix modules</Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-md-auto">				
              <li className="nav-item">
                <a href="#" className="navbar-nav-link legitRipple">
                    <Link to="/" onClick={deconnexion}><i className="icon-switch2"></i> Logout</Link>
                </a>
              </li>
            </ul>
        </div>
      </div>
    </div>
      <Route path="/dashboard" component={DashboardApprenant} />
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
