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


    <div className="ashier">  
      <div className="navbar navbar-expand-md navbar-dark bg-indigo navbar-static">
          <div className="navbar-brand">
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
                  <Link to="/"><i className="icon-users"></i>Home</Link>
                </li>
                <li className="itemlst">
                  <Link to="/suiviTuteur"><i className="icon-users"></i>Suivi Tuteur</Link>
                </li>
              </ul>

              <ul className="navbar-nav ml-md-auto">				
                <li className="nav-item">
                  <a href="#" className="navbar-nav-link legitRipple">
                      <Link to="" onClick={deconnexion}><i className="icon-switch2"></i> Logout</Link>
                  </a>
                </li>
              </ul>
          </div>
      </div>
    </div>
      <Route exact path="/" component={Home} />
      <Route path="/suiviTuteur" component={SuiviTuteur} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default Path;
