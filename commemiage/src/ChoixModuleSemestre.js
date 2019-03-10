import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

class ChoixModuleSemestre extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            apprenantId:'5c77ee6a55fe3928bceaf763',
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
            moduleProvisoire:[],
            moduleGet: []
        }
    }

    componentDidMount() {
        console.log('componentDidMount - Choix Module Semestre');
        let currentComponent = this;
        
        fetch('http://localhost:3010/apprenants/get/'+this.state.apprenantId)
        .then((resp) => resp.json())
        .then(function(apprenant) {
            console.log("apprenant get: "+ JSON.stringify(apprenant));         

            currentComponent.setState({apprenant : apprenant});

            var provisoire = [];
            apprenant.semestre.forEach(function(semestre) {
                var mods = [];
                semestre.module.forEach(function(module) {
                    mods.push({label:module.nom});
                });
                provisoire.push(mods);
            });
            console.log("provisoire: "+ JSON.stringify(provisoire));
            currentComponent.setState({moduleProvisoire : provisoire});

            fetch('http://localhost:3010/filieres/get/' + apprenant.filiere.filiereId)
            .then((resp) => resp.json())
            .then(function(filiere) {
                var list = [];
                filiere.module.forEach(function(module) {
                    list.push({label:module.nom,value:module.nom})
                });
                console.log("set moduleGet: "+ JSON.stringify(currentComponent.state.moduleGet));
                currentComponent.setState({moduleGet : list});
            })
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify(this.state.apprenant));

          fetch('http://localhost:3010/apprenants/update/'+this.state.apprenantId,{
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
    } 

    handleChange = (module, index) => {
        console.log("this change: ", JSON.stringify(module));

        let list = [];
        let modules = [];
        module.forEach(function(module) {
            list.push({label:module.label})
            modules.push({nom:module.label})
          });

        let apprenant = this.state.apprenant;
        apprenant.semestre[index].module=modules;
        let provisoire = this.state.moduleProvisoire;
        provisoire[index] = list;
        this.setState({moduleProvisoire:provisoire, apprenant:apprenant});
    }

    render() {

        var semestres = this.state.apprenant.semestre.map( (semestre,index) => {
            return (
                <div className="panel-body">
                    <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="nom">{semestre.nom}</label>
                                <input type="hidden" id={"nom-" + semestre.nom} name="nom" value={semestre.nom}/>
    
                                <Select id={"module-" + semestre.nom} name="module" options={ this.state.moduleGet } value={this.state.moduleProvisoire[index]} onChange={(ev)=>this.handleChange(ev, index)} isMulti />
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