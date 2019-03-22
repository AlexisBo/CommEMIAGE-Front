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
                filiere : {
                    nom : ''
                },
                tuteur : {
                    tuteurId : '',
                    nom : '',
                    prenom : ''
                },
                semestre: [{
                    nom : '',
                    dateDebut : '',
                    dateFin : ''
                }]
          }],
          semestreGet: [{
              nom : '',
              dateDebut : '',
              dateFin : ''
          }],
          filiereGet:[],
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

        fetch('http://localhost:3010/semestres/')
        .then((resp) => resp.json())
        .then(function(semestre) {      
            console.log("semestre get: "+ semestre);
            var list = [];
            semestre.forEach(function(s) {
                list.push(s);
            });      
            currentComponent.setState({semestreGet : list});
        })

        fetch('http://localhost:3010/filieres/')
        .then((resp) => resp.json())
        .then(function(filiere) {
            console.log("filiere get: "+ filiere);
            var list = [];
            filiere.forEach(function(filiere) {
                console.log(filiere);
                list.push({label:filiere.nom,value:filiere.nom})
            });
            
            currentComponent.setState({filiereGet : list});
        })

        fetch('http://localhost:3010/tuteurs/')
        .then((resp) => resp.json())
        .then(function(tuteur) {
            console.log("tuteur get: "+ tuteur);
            var list = [];
            tuteur.forEach(function(tuteur) {
                console.log(tuteur);
                list.push({label:tuteur.nom,value:{tuteurId:tuteur._id, nom:tuteur.nom, prenom:tuteur.prenom}})
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
    } 

    handleFiliereChange = (filiere, index) => {
        var module = this.state.module;
        module[index].filiere = filiere;
        this.setState({ module: module});
    }

    handleTuteurChange = (tuteur, index) => {
        var module = this.state.module;
        module[index].tuteur = tuteur;
        this.setState({ module: module});
    }

    render() {

        var modules = this.state.module.map( (module,index) => {
            //const { tuteur } = this.state.module[index].tuteur;
            return (
                <div>
                    <label htmlFor={module.nom}>{module.nom}</label>
                    <input type="hidden" id={module.nom} name={module.nom} value={module.nom}/>
                    
                    <Select name="tuteur" options={ this.state.tuteurGet } /*value={tuteur}*/ onChange={(ev)=>this.handleTuteurChange(ev, index)} />  
                </div>
            )
        });

        var semestres = this.state.semestreGet.map( (semestre,index) => {
            return (
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="title">{semestre.nom}</h5>
                            {modules}
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
                        { semestres }
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Choix modules </button>
                        </div>
                    </form>
                </div>
            </div>
        )
            

    }
}

export default AttributionTuteur