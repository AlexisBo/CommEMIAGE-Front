import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

class SuiviTuteur extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            apprenant : {
                _id : '',
                nom :'',
                prenom : '',
                adresse : '',
                email : '',
                dateFormation : '',
                filiere : '',
                semestre : [{
                    nom : '',
                    dateDebut : '',
                    dateFin : '',
                    module : [{
                          nom : '',
                          evaluation : [{
                                alias : '',
                          }],
                          suivi : [{
                                alias : '',
                          }]
                    }]
              }]
            },
            suivi : {
                alias : '',
                questions : '',
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
            apprenantSelected : {
                apprenantId : '',
                nom : '',
                prenom : ''
            },
            moduleSelected : {
                moduleId : '',
                nom : ''
            },
            tuteurSelected : {
                tuteurId : '',
                nom : '',
                prenom : ''
            },
            semestreNom : ''
        };
    }
    
    componentDidMount() {
        console.log('componentDidMount - Suivi Tuteur');
        let currentComponent = this;

        fetch('http://localhost:3010/apprenant/get/' + this.state.apprenantSelected.apprenantId)
            .then((resp) => resp.json())
            .then(function(apprenant) {
                currentComponent.setState({ apprenant : apprenant});
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        let currentComponent = this;

        console.log('handleSubmit');
        console.log('check data',this.state);

        this.setState({suivi : {tuteur : this.state.tuteurSelected, apprenant : this.state.apprenantSelected, module : this.state.moduleSelected}});
        this.setState({suivi : { alias : this.state.suivi.apprenant.nom + this.state.suivi.apprenant.prenom + " - " + this.state.suivi.tuteur.nom + this.state.suivi.tuteur.prenom + " - " + this.state.suivi.module.nom}});

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

        let apprenant = this.state.apprenant;
        apprenant.semestre.forEach(function(semestre) {
            if(semestre.nom === currentComponent.semestreNom){
                semestre.module.forEach(function(module) {
                    if(module.nom === currentComponent.moduleSelected.nom && !module.suivi.includes({alias : currentComponent.state.suivi.alias})){
                        module.suivi.push(currentComponent.state.suivi.alias);
                    }
                });
            }
        });

        fetch('http://localhost:3010/apprenants/update/'+ apprenant._id,{
        method: 'PUT',
        body: JSON.stringify({
            apprenant: this.state.apprenant
        }),
        headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
        console.log(response => response.json());
        return response => response.json()
        }).then(function(body){
        console.log(body);
        });

        window.location.reload();
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
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Enregistrer</button>
                </div>
            </form>
        )
    }

}

export default SuiviTuteur