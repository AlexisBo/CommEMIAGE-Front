import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        console.log('check data json',JSON.stringify({
            module: this.state.module
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
          
          window.location.reload();
    }

    handleChange = (tuteur, index, indexSem) => {
        var module = this.state.module;
        module[index].semestre[indexSem].tuteur = tuteur.value;
        this.setState({ module: module});
    }

    render() {

        var modules = this.state.module.map( (module,index) => {
            return (
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="title">{index + 1} Module : {module.nom}</h5>
                            {module.semestre.map( (semestre,indexSem) => {
                                return (
                                    <div>
                                        <label htmlFor={semestre.nom}>{indexSem + 1} Semestre : {semestre.nom}</label>
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
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Choix des tuteurs par semestres</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        { modules }
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Choix tuteurs </button>
                        </div>
                    </form>
                </div>
            </div>
        )
            

    }
}

export default AttributionTuteur