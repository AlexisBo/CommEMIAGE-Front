import React, { Component } from 'react';
import Select from 'react-select';
//import 'bootstrap/dist/css/bootstrap.min.css';

class ChoixModuleSemestre extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            apprenant: {
                _id: '',
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
            module:[{
                _id : '',
                nom : '',
                coefficient : '',
                seuil : '',
                semestre : [{
                    nom : '',
                    dateDebut : '',
                    dateFin : '',
                    tuteur : {
                        nom : '',
                        prenom : ''
                    },
                    apprenant : [{
                        apprenantId : '',
                        nom : '',
                        prenom : ''
                    }]
                }]
            }],
            moduleProvisoire:[],
            moduleGet: []
        }
    }

    componentDidMount() {
        console.log('componentDidMount - Choix Module Semestre');
        let currentComponent = this;
        
        fetch('http://localhost:3010/apprenants/getEmail/'+ localStorage.getItem('user_email'))
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
                fetch('http://localhost:3010/modules/')
                .then((resp) => resp.json())
                .then(function(module) {
                    console.log("modules get: "+ module);
                    let list = [];
                    let modules = [];
                    module.forEach(function(module) {
                        filiere.module.forEach(function(filModule) {
                            if(filModule.nom === module.nom){
                                list.push({label:module.nom,value:module._id});
                                return;
                            }
                        });

                        modules.push(module)
                    });
                    currentComponent.setState({moduleGet : list});
                    currentComponent.setState({module : modules});
                })
            })
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let currentComponent = this;

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify(this.state.apprenant));

        fetch('http://localhost:3010/apprenants/update/'+this.state.apprenant._id,{
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
            console.log("looking" + JSON.stringify(currentComponent.state.module));
            fetch('http://localhost:3010/modules/update',{
            method: 'PUT',
            body: JSON.stringify({
                module: currentComponent.state.module
            }),
            headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
            console.log(response => response.json());
            return response => response.json()
            }).then(function(body){
                console.log(body);
            });
        }); 
          
          window.location.reload();
    } 

    handleChange = (module, index) => {
        console.log("this change: ", JSON.stringify(module) + " - length:" + module.length);

        let apprenant = this.state.apprenant;
        let provisoire = this.state.moduleProvisoire;
        let modules = this.state.module;

        let newMod = {
            nom : '',
            semestre : {
                nom : apprenant.semestre[index].nom,
                apprenant : {
                    apprenantId : this.state.apprenant._id,
                    nom : this.state.apprenant.nom,
                    prenom : this.state.apprenant.prenom
                }
            }
        }
        
        if(module.length > 0) {
            let nomModule = module[module.length -1].label;
            apprenant.semestre[index].module.push({nom:nomModule});
            provisoire[index].push({label:nomModule});
            newMod.nom = nomModule;         
        } else {
            modules.forEach(function(mod) {
                if(provisoire[index].includes({label:mod.nom})) {
                    mod.semestre.forEach(function(semestre) {
                        if(semestre.nom === newMod.semestre.nom) {
                            let index = semestre.apprenant.indexOf(newMod.semestre.apprenant);
                            if (index !== -1) semestre.apprenant.splice(index, 1);
                        }
                    });
                }
            });
            apprenant.semestre[index].module = [];
            provisoire[index] = [];
        }
        
        modules.forEach(function(mod) {
            if(mod.nom === newMod.nom){
                mod.semestre.forEach(function(semestre) {
                    if(semestre.nom === newMod.semestre.nom) {
                        if(!semestre.apprenant.includes(newMod.semestre.apprenant)) {
                            semestre.apprenant.push(newMod.semestre.apprenant);
                        }
                    }
                });
            }
        });

        this.setState({moduleProvisoire : provisoire, apprenant : apprenant, module : modules});

        console.log("moduleProvisoire: ", JSON.stringify(this.state.moduleProvisoire));
        console.log(" - apprenant: ", JSON.stringify(this.state.apprenant));
        console.log( " - module: ", JSON.stringify(this.state.module));
    }

    render() {

        var semestres = this.state.apprenant.semestre.map( (semestre,index) => {
            return (
                <div className="card-body">
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
                <div className="card">
                    <div className="card-header">
                        <h4 className="title">Choix des modules par semestres</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        { semestres }
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Choix modules </button>
                        </div>
                    </form>
                </div>
            </div>
        );          
    }
}

export default ChoixModuleSemestre