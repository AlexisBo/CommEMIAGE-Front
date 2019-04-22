import React, { Component } from 'react';
import Select from 'react-select';
//import 'bootstrap/dist/css/bootstrap.min.css';

class AttributionTuteur extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            module: [{
                _id : '',
                nom : '',
                coefficient: '',
                seuil: '',
                semestre: [{
                    nom : '',
                    dateDebut : '',
                    dateFin : '',    
                    tuteur : {
                        nom : '',
                        prenom : ''
                    },
                }]
          }],
            tuteur : [{
            _id : '',
            nom: '',
            prenom : '',
            adresse : '',
            email : '',
            module : [{
                moduleId : '',
                nom : ''
            }]
            }],
            tuteurGet:[]
        }
    }

    componentDidMount() {
        console.log('componentDidMount - Attribution Tuteur');
        let currentComponent = this;
        
        fetch('http://localhost:3010/modules/')
        .then((resp) => resp.json())
        .then(function(module) {
            console.log("module get: "+ module);
            var list = [];
            module.forEach(function(mod) {
                console.log("mod:"+JSON.stringify(mod));
                list.push(mod);
            });
            currentComponent.setState({module : list});
        })

        fetch('http://localhost:3010/tuteurs/')
        .then((resp) => resp.json())
        .then(function(tuteur) {
            console.log("tuteur get: "+ tuteur);

            currentComponent.setState({tuteur : tuteur});

            var list = [];
            tuteur.forEach(function(tuteur) {
                console.log(tuteur);
                list.push({label:tuteur.nom,value:{nom:tuteur.nom, prenom:tuteur.prenom}})
            });
            
            currentComponent.setState({tuteurGet : list});
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check module json',JSON.stringify({
            module: this.state.module
        }));
        console.log('check tuteur json',JSON.stringify({
            tuteur: this.state.tuteur
        }));

          fetch('http://localhost:3010/modules/update',{
            method: 'PUT',
            body: JSON.stringify({
                module: this.state.module
            }),
            headers: {"Content-Type": "application/json"}
          })
          .then(function(response){
            console.log(response => response.json());
            return response => response.json()
          }).then(function(body){
            console.log(body);
          });

          fetch('http://localhost:3010/tuteurs/update',{
            method: 'PUT',
            body: JSON.stringify({
                tuteur: this.state.tuteur
            }),
            headers: {"Content-Type": "application/json"}
          })
          .then(function(response){
            console.log(response => response.json());
            return response => response.json()
          }).then(function(body){
            console.log(body);
          });
          
          //window.location.reload();
    }

    handleChange = (tuteur, index, indexSem) => {
        let module = this.state.module;
        let tuteurs = this.state.tuteur;

        var i, j;
        for(i = 0; i < tuteurs.length; i++) {
            if(module[index].semestre[indexSem].tuteur === {nom : tuteurs[i].nom, prenom : tuteurs[i].prenom}){                
                let ind = tuteurs[i].module.indexOf({moduleId : module[index]._id, nom : module[index].nom});
                if (ind !== -1) tuteurs[i].module.splice(ind, 1);
                break;
            }
        }

        module[index].semestre[indexSem].tuteur = tuteur.value;
        this.setState({ module: module});

        for(i = 0; i < tuteurs.length; i++) {
            if(tuteur.label === tuteurs[i].nom) {
                let exist = false;
                for(j = 0; j < tuteurs[i].module.length; j++) {
                    if(module[index]._id === tuteurs[i].module[j].moduleId) {
                        exist = true;
                        break;
                    }
                }
                if(!exist) {
                    tuteurs[i].module.push({semestre : module[index].semestre[indexSem].nom, moduleId : module[index]._id, nom : module[index].nom});
                }
            }
        }

        this.setState({tuteur: tuteurs});
    }

    render() {

        var modules = this.state.module.map( (module,index) => {
            return (
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="title">Module n°{index + 1} : {module.nom}</h5>
                            {module.semestre.map( (semestre,indexSem) => {
                                return (
                                    <div>
                                        <label htmlFor={semestre.nom}>Semestre n°{indexSem + 1} : {semestre.nom}</label>
                                        <input type="hidden" id={semestre.nom} name={semestre.nom} value={semestre.nom}/>
                                        
                                        <Select name="tuteur" options={ this.state.tuteurGet } value={semestre.tuteur} onChange={(ev)=>this.handleChange(ev, index, indexSem)} /> 
                                    </div>
                                )
                            })}
                        </div>  
                    </div>
                </div>
            )
        });

        return (
            <div className="attribution-tuteur col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4 className="title">Choix des tuteurs par semestres</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        { modules }
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Choix tuteurs </button>
                        </div>
                    </form>
                </div>
            </div>
        )
            

    }
}

export default AttributionTuteur