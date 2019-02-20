import React, { Component } from 'react'

class AttributionTuteur extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            module: [{
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
          semestre: [{
              nom : '',
              dateDebut : '',
              dateFin : ''
          }],
          moduleGet:[]
        }
    }

    componentDidMount() {
        console.log('componentDidMount - Creation Filiere');
        let currentComponent = this;
        
        fetch('http://localhost:3010/modules/')
        .then((resp) => resp.json())
        .then(function(module) {
            console.log("module get: "+ module);
            var list = [];
            module.forEach(function(module) {
                console.log(module);
                list.push({label:module.nom,value:module.nom})
            });
            
            currentComponent.setState({moduleGet : list});   
            currentComponent.setState({module : module});
        })

        fetch('http://localhost:3010/semestres/')
        .then((resp) => resp.json())
        .then(function(semestre) {            
            currentComponent.setState({semestre : semestre});
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            nom: this.state.nom,
            tuteur: this.state.tuteur
          }));

          fetch('http://localhost:3010/semestres/add',{
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom,
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
    } 

    render() {

        var modules = this.state.module.map( (module,index) => {
            return (
                <div>
                    <label htmlFor="nom">{module.nom}</label>
                    <input type="hidden" id="nom" name="nom" value={module.nom}/>
                    
                    <select className="form-control" name="tuteur">
                        <option value="tuteur1">Tuteur 1</option>
                        <option value="tuteur2">Tuteur 2</option>
                        <option value="tuteur3">Tuteur 3</option>
                        <option value="tuteur4">Tuteur 4</option>
                    </select>
                </div>
            )
        });

        var semestres = this.state.semestre.map( (semestre,index) => {
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