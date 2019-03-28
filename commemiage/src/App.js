import React, { Component } from 'react';
import './ressources/App.css';
import './ressources/css/bootstrap_limitless.css';
import Administrateur from './PathAdministrateur';
import Tuteur from './PathTuteur';
import Apprenant from './PathApprenant';
import Login from "./Login";


class App extends Component {
  render() {
    if(localStorage.getItem('user_email') != null) {

      if(localStorage.getItem('user_role') === "Administrateur") {
        return (
          <div className="App">
            <Administrateur/>
          </div>
        );
      } else if(localStorage.getItem('user_role') === "Tuteur") {
        return (
          <div className="App">
            <Tuteur/>
          </div>
        );
      } else if(localStorage.getItem('user_role') === "Apprenant") {
        return (
          <div className="App">
            <Apprenant/>
          </div>
        );
      }

    } else {
      return (
        <div className="App">
          <Login/>
        </div>
      );
    }
  }
}

export default App;
