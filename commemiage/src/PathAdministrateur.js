import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreationModule from "./CreationModule";
import CreationFiliere from "./CreationFiliere";
import AttributionTuteur from "./AttributionTuteur";
import NewTuteur from "./NewTuteur";

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
                  <Link to="/creationfiliere"><i className="icon-users"></i>Création filière</Link>
                </li>
                <li className="itemlst">
                  <Link to="/creationmodule"> <i className="icon-users"></i>Création module</Link>
                </li>
                <li className="itemlst">
                  <Link to="/newtuteur"><i className="icon-users"></i>Création Tuteur</Link>
                </li>
                <li className="itemlst">
                  <Link to="/attributiontuteur"><i className="icon-users"></i>Attribution tuteur</Link>
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
    <Route path="/creationmodule" component={CreationModule} />
    <Route path="/creationfiliere" component={CreationFiliere} />
    <Route path="/attributiontuteur" component={AttributionTuteur} />
    <Route path="/newtuteur" component={NewTuteur} />
   </div>
 </Router>
);

const Home = () => (
 <div>
   <h2>Home</h2>
 </div>
);

export default Path;