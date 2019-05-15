import React, { Component } from 'react';
import './ressources/css/bootstrap.css';
import './ressources/css/bootstrap_limitless.css';
import './ressources/css/components.css';
import './ressources/css/colors.css';
import './ressources/css/layout.css';
import './ressources/css/icons/icomoon/styles.css';
import './ressources/css/custom.css';
import './ressources/css/custom.sass';
import './ressources/App.css';
import Administrateur from './PathAdministrateur';
import Tuteur from './PathTuteur';
import Apprenant from './PathApprenant';
import Login from "./Login";


class App extends Component {
  render() {
    if(localStorage.getItem('user_email') != null) {

      if(localStorage.getItem('user_role') === "Administrateur") {
        return (
          <div className="App ashier">
            <Administrateur/>
          </div>
        );
      } else if(localStorage.getItem('user_role') === "Tuteur") {
        return (
          <div className="App ashier">
            <Tuteur/>
          </div>
        );
      } else if(localStorage.getItem('user_role') === "Apprenant") {
        return (
          <div className="App ashier">
            <Apprenant/>
          </div>
        );
      }

    } else {
      return (
        <div className="App ashier">
          <Login/>
        </div>
      );
    }
  }
}

export default App;
