import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreationModule from "./CreationModule";
import CreationFiliere from "./CreationFiliere";
import AttributionTuteur from "./AttributionTuteur";
import NewTuteur from "./NewTuteur";
import InscriptionApprenant from "./InscriptionApprenant";
import DashboardAdmin from "./DashboardAdmin";

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
              <li className="itemlst">
                <Link to="/newapprenant"><i className="icon-users"></i>Création Apprenant</Link>
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
    <Route path="/dashboard" component={DashboardAdmin} />
    <Route path="/creationmodule" component={CreationModule} />
    <Route path="/creationfiliere" component={CreationFiliere} />
    <Route path="/attributiontuteur" component={AttributionTuteur} />
    <Route path="/newtuteur" component={NewTuteur} />
    <Route path="/newapprenant" component={InscriptionApprenant} />
   </div>
 </Router>
);

export default Path;