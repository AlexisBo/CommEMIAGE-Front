import React, { Component } from 'react';
import Select from 'react-select';
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
                list.push({label:module.nom + " - " + module.semestre,value:{ semestre: module.semestre, moduleId : module._id, nom : module.nom}});
            });
            currentComponent.setState({moduleGet : list});
        
            list = [];
            currentComponent.state.moduleGet.forEach(async function(module) {
                let apprenants = await new Promise((resolve, reject) => {  
                    fetch('http://localhost:3010/modules/get/' + module.moduleId)
                    .then((resp) => resp.json())
                    .then(function(data) {
                        data.semestre.forEach(function(semestre) {
                            if(semestre.nom === module.semestre) {
                                resolve(semestre.apprenant);
                            }
                        });
                    });
                });
                apprenants.forEach(function(apprenant) {
                    list.push({label : apprenant.prenom + " " + apprenant.nom,value : apprenant})
                });
            });
            currentComponent.setState({apprenantGet : list});
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
    
    /*handleApprenantChange = (apprenant) => {
        this.setState({ suivi : {apprenant : apprenant.value} });
    }*/
    
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
        const { module } = this.state.suivi.module.nom;
        const { apprenant } = this.state.suivi.apprenant.prenom + " " +this.state.suivi.apprenant.nom;

        return (
            <div className="content">
                <form onSubmit={this.handleSubmit}>
                    <div className="choix-etudiant col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="title">Selection des criteres</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6" style={{margin: 'auto'}}>
                                        <label htmlFor="tuteur">Tuteur : {this.state.tuteur.prenom + " " + this.state.tuteur.nom}</label>
                                        <br />          
                                        <label htmlFor="module">Module :</label>
                                        <Select id="module" name="module" options={ this.state.moduleGet } value={module} onChange={this.handleModuletChange}/>
                                        
                                        <label htmlFor="apprenant">Apprenant :</label>
                                        <Select id="apprenant" name="apprenant" options={ this.state.apprenantGet } value={apprenant} onChange={this.handleApprenantChange}/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="suivi-tuteur col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="title">Fiche de suivi</h4>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <h4 style={{marginLeft: 286 + 'px'}}>Synthèse tutorat</h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{margin: 'auto'}}>
                                        <h5>Liste des questions concernant le module</h5>
                                        <textarea id="questions" value={this.state.suivi.questions} onChange={this.handleQuestionsChange} className="form-control" rows="5" cols="33">
                                        </textarea>
                                    </div>  
                                </div>

                                <div className="row">
                                    <h4 style={{marginLeft: 286 + 'px'}}>Synthèse générale</h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" style={{margin: 'auto'}}>
                                        <h5>Remarques et suggestions</h5>
                                        <textarea id="remarques" value={this.state.suivi.remarques} onChange={this.handleRemarquesChange} className="form-control" rows="5" cols="33">
                                        </textarea>
                                    </div>  
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default SuiviTuteur