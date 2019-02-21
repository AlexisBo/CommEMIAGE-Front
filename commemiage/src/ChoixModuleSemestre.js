import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

class ChoixModuleSemestre extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            apprenant: {
                nom: '',
                prenom : '',
                adresse : '',
                email : '',
                dateFormation : '',
                filiere : {filiereId: '', nom: ''},
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
            moduleGet: [],
        }
    }

    componentDidMount() {
        console.log('componentDidMount - Choix Module Semestre');
        let currentComponent = this;
        
        fetch('http://localhost:3010/apprenants/get/5c6dd85826198d34944003ef')
        .then((resp) => resp.json())
        .then(function(apprenant) {
            console.log("apprenant get: "+ apprenant);         

            currentComponent.setState({apprenant : apprenant});

            fetch('http://localhost:3010/filieres/get/' + apprenant.filiere.filiereId)
            .then((resp) => resp.json())
            .then(function(filiere) {
                console.log("filiere get: "+ filiere);
                var list = [];
                filiere.module.forEach(function(module) {
                    console.log(module);
                    list.push({label:module.nom,value:module.nom})
                });
                
                currentComponent.setState({moduleGet : list});
            })
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3010/apprenants/delete/5c6dd85826198d34944003ef',{
            method: 'DELETE'
          })
          .then(function(response){
            console.log(response => response.json());
            return response => response.json()
          }).then(function(body){
            console.log(body);
          });

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            apprenant: this.state.apprenant
          }));

          fetch('http://localhost:3010/apprenants/add',{
            method: 'POST',
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
    } 

    /*handleChange = (module) => {
        var list = [];
        module.forEach(function(module) {
            list.push({nom:module.value})
          });
        this.setState({ module:list });
    }*/

    render() {

        var semestres = this.state.apprenant.semestre.map( (semestre,index) => {
            return (
                <div className="panel-body">
                <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="nom">{semestre.nom}</label>
                            <input type="hidden" id="nom" name="nom" value={semestre.nom}/>
 
                            <Select id="module" name="module" options={ this.state.moduleGet } value={semestre.module} isMulti />
                        </div>  
                </div>
            </div>
            )
        });

        return (
            <div className="choix-module col-md-6">
            <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                <div className="panel-header">
                    <h4 className="title">Choix des modules par semestres</h4>
                </div>
                <form onSubmit={this.handleSubmit}>
                    { semestres }
                    <div className="panel-footer">
                        <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Choix modules </button>
                    </div>
                </form>
            </div>
            </div>
        );          
    }
}

export default ChoixModuleSemestre