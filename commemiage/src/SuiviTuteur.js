import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            tuteurGet : [],
            apprenantGet : [],
            moduleGet : []
        };
    }
    
    componentDidMount() {
        console.log('componentDidMount - Suivi Tuteur');
        let currentComponent = this;
        
        fetch('http://localhost:3010/tuteurs/')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("data get: "+ data);
            var list = [];
            data.forEach(function(tuteur) {
                console.log(tuteur);
                list.push({label:tuteur.prenom + " " + tuteur.nom,value:{ tuteurId : tuteur._id, nom : tuteur.nom, prenom : tuteur.prenom }})
            });
            
            currentComponent.setState({tuteurGet : list});
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
        
        fetch('http://localhost:3010/modules/')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("data get: "+ data);
            var list = [];
            data.forEach(function(module) {
                console.log(module);
                module.semestre.forEach(function(semestre) {
                    list.push({label:module.nom + " - " + semestre.nom,value:{ moduleId : module._id, nom : module.nom }})
                });
            });
            
            currentComponent.setState({moduleGet : list});
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);

        this.setState({suivi : { alias : this.state.suivi.apprenant + " - " + this.state.suivi.module}})

        console.log('check module json',JSON.stringify({
            alias : this.state.suivi.alias,
            questions: this.state.suivi.questions,
            remarques : this.state.suivi.remarques,
            tuteur : this.state.suivi.tuteur,
            apprenant : this.state.suivi.apprenant,
            module : this.state.suivi.module
        }));

        fetch('http://localhost:3010/suivis/add',{
            method: 'POST',
            body: JSON.stringify({
                alias : this.state.suivi.alias,
                questions: this.state.suivi.questions,
                remarques : this.state.suivi.remarques,
                tuteur : this.state.suivi.tuteur,
                apprenant : this.state.suivi.apprenant,
                module : this.state.suivi.module
            }),
            headers: {"Content-Type": "application/json"}
          })
          .then(function(response){
            console.log(response => response.json());
            return response => response.json()
          }).then(function(body){
            console.log(body);
          });
    }
    
    handleTuteurChange = (tuteur) => {
        this.setState({ suivi : {tuteur : tuteur.value} });
    }
    
    handleApprenantChange = (apprenant) => {
        this.setState({ suivi : {apprenant : apprenant.value} });
    }
    
    handleModuleChange = (module) => {
        this.setState({ suivi : {module : module.value} });
    }
    
    handleQuestionsChange = (questions) => {
        this.setState({ suivi : {questions : questions} });
    }
    
    handleRemarquesChange = (remarques) => {
        this.setState({ suivi : {remarques : remarques} });
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="choix-etudiant col-md-6">
                    <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                        <div className="panel-header">
                            <h4 className="title">Selection des criteres</h4>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="tuteur">Tuteur :</label>
                                    <Select id="tuteur" name="tuteur" options={ this.state.tuteurGet } value={this.state.suivi.tuteur.prenom + " " +this.state.suivi.tuteur.nom} onChange={this.handleTuteurChange}/>
                                    
                                    <label htmlFor="apprenant">Apprenant :</label>
                                    <Select id="apprenant" name="apprenant" options={ this.state.apprenantGet } value={this.state.suivi.apprenant.prenom + " " +this.state.suivi.apprenant.nom} onChange={this.handleApprenantChange}/>
                                    
                                    <label htmlFor="module">Module :</label>
                                    <Select id="module" name="module" options={ this.state.moduleGet } value={this.state.suivi.module.nom} onChange={this.handleModuletChange}/>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="suivi-tuteur col-md-6">
                    <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                        <div className="panel-header">
                            <h4 className="title">Fiche de suivi</h4>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Apprenant : </h5> {this.state.suivi.apprenant.prenom + " " +this.state.suivi.apprenant.nom}
                                    <h5>Module : </h5> {this.state.suivi.module.nom}
                                </div>
                                <div className="col-md-6">
                                    <h5>Tuteur : </h5> {this.state.suivi.tuteur.prenom + " " +this.state.suivi.tuteur.nom}
                                </div>   
                            </div>

                            <hr></hr>

                            <div className="row">
                                <h4 style={{marginLeft: 286 + 'px'}}>Synthèse tutorat</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Liste des questions concernant le module</h5>
                                    <textarea id="questions" value={this.state.suivi.questions} onChange={this.handleQuestionsChange} className="form-control" rows="5" cols="33">
                                    </textarea>
                                </div>  
                            </div>

                            <div className="row">
                                <h4 style={{marginLeft: 286 + 'px'}}>Synthèse générale</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Remarques et suggestions</h5>
                                    <textarea id="remarques" value={this.state.suivi.remarques} onChange={this.handleRemarquesChange} className="form-control" rows="5" cols="33">
                                    </textarea>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Enregistrer</button>
                </div>
            </form>
        )
    }

}

export default SuiviTuteur