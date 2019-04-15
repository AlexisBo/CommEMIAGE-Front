import React, { Component } from 'react';
import Select from 'react-select';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SelectionSuivi from "./SelectionSuivi";
//import 'bootstrap/dist/css/bootstrap.min.css';

class SuiviTuteur extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            suivi : {
                alias : '',
                questions: '',
                remarques : '',
                tuteur : {
                    tuteurId : '',
                    nom : '',
                    prenom : ''
                },
                apprenant : {
                    apprenantId : '',
                    nom : '',
                    prenom : ''
                },
                module : {
                    moduleId : '',
                    nom : ''
                }
            },
            tuteur : {
                nom : '',
                prenom : '',
                adresse : '',
                email : '',
                module : [{
                    moduleId : '',
                    nom : ''
                }],
                apprenant : [{
                    apprenantId : '',
                    nom : '',
                    prenom : ''
                }]
            },
            apprenantGet : [],
            moduleGet : []
        };
    }
    
    componentDidMount() {
        console.log('componentDidMount - Suivi Tuteur');
        let currentComponent = this;
        
        fetch('http://localhost:3010/tuteurs/getEmail/'+ localStorage.getItem('user_email'))
        .then((resp) => resp.json())
        .then(function(tuteur) {
            console.log("tuteur get: "+ JSON.stringify(tuteur));         

            currentComponent.setState({tuteur : tuteur});
           
            let list = []; 
            tuteur.module.forEach(function(module) {
                console.log(module);
                fetch('http://localhost:3010/modules/get/'+ module.moduleId)
                .then((resp) => resp.json())
                .then(function(module) {
                    console.log("module get: "+ JSON.stringify(module));         

                    module.semestre.forEach(function(semestre) {
                        list.push({label:module.nom + " - " + semestre.nom,value:{ moduleId : module._id, nom : module.nom }});
                    });
                    currentComponent.setState({moduleGet : list});
                })
            });
        })
        
        fetch('http://localhost:3010/apprenants/')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("data get: "+ data);
            var list = [];
            data.forEach(function(apprenant) {
                console.log(apprenant);
                list.push({label:apprenant.prenom + " " + apprenant.nom,value:{ apprenantId : apprenant._id, nom : apprenant.nom, prenom : apprenant.prenom }})
            });
            
            currentComponent.setState({apprenantGet : list});
        })        
    }
    
    handleApprenantChange = (apprenant) => {
        this.setState({ suivi : {apprenant : apprenant.value} });
    }
    
    handleModuleChange = (module) => {
        this.setState({ suivi : {module : module.value} });
    }
    
    render(){
        const { module } = this.state.suivi.module.nom;
        const { apprenant } = this.state.suivi.apprenant.prenom + " " +this.state.suivi.apprenant.nom;

        return (
            <Router>
                <form onSubmit={this.handleSubmit}>
                    <div className="choix-etudiant col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="title">Selection des criteres</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="tuteur">Tuteur : {this.state.tuteur.prenom + " " + this.state.tuteur.nom}</label>
                                        <br />
                                        
                                        <label htmlFor="apprenant">Apprenant :</label>
                                        <Select id="apprenant" name="apprenant" options={ this.state.apprenantGet } value={apprenant} onChange={this.handleApprenantChange}/>
                                        
                                        <label htmlFor="module">Module :</label>
                                        <Select id="module" name="module" options={ this.state.moduleGet } value={module} onChange={this.handleModuletChange}/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Enregistrer</button>
                    </div>
                </form>
                <Link to="/selectionSuivi">Editer son suivi...</Link>
                <Route path="/selectionSuivi" component={SelectionSuivi} />
        </Router>
        )
    }

}

export default SuiviTuteur