import React, { Component } from 'react';
import Select from 'react-select';
import './ressources/css/bootstrap_limitless.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

class CreationFiliere extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            nom: '',
            description: '',
            module : [{
                nom : ''
            }],
            moduleGet : []
        };
    }

    componentDidMount() {
        console.log('componentDidMount - Creation Filiere');
        let currentComponent = this;
        
        fetch('http://localhost:3010/modules/')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("data get: "+ data);
            var list = [];
            data.forEach(function(module) {
                console.log(module);
                list.push({label:module.nom,value:module.nom})
            });
            
            currentComponent.setState({moduleGet : list});
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            nom: this.state.nom,
            description: this.state.description,
            module: this.state.module,
          }));

          fetch('http://localhost:3010/filieres/add',{
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom,
                description: this.state.description,
                module: this.state.module,
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

    handleChange = (module) => {
        var list = [];
        module.forEach(function(module) {
            list.push({nom:module.value})
          });
        this.setState({ module:list });
    }

    render() {
        const { module } = this.state.module;

        return (            
            <div className="content">
                <div className="creation-filiere col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Création d'une filière</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="card-body form-group">
                                
                                <label>Saisir le nom de la filière</label>
                                <input style={{marginBottom: 15 + 'px', marginTop: 0 + 'px'}} type="text" className="form-control" value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})} id="nom" name="nom"/>
                                
                                <label>Saisir la description de la filière</label>
                                <input style={{marginBottom: 15 + 'px', marginTop: 0 + 'px'}} type="text" className="form-control" value={this.state.description} onChange={(ev)=>this.setState({description:ev.target.value})} id="description" name="description"/>
                                
                                <label htmlFor="module">Modules :</label>
                                <Select id="module" name="module" options={ this.state.moduleGet } value={module} onChange={this.handleChange} isMulti />                  
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Création filière </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreationFiliere