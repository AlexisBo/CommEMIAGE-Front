import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    componentDidUpdate(prevProps, prevState) {
            console.log('componentDidUpdate - prevProps : ' + prevProps);
            console.log('componentDidUpdate - prevState : '+ prevState);
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
            <div className="creation-filiere col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Création d'une filière</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">

                            <label htmlFor="nom">Saisir le nom de la filière</label>
                            <input type="text" className="form-control" value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})} id="nom" name="nom"/>

                            <label htmlFor="nom">Saisir la description de la filière</label>
                            <input type="text" className="form-control" value={this.state.description} onChange={(ev)=>this.setState({description:ev.target.value})} id="description" name="description"/>
                            
                            <label htmlFor="module">Modules :</label>
                            <Select id="module" name="module" options={ this.state.moduleGet } value={module} onChange={this.handleChange} isMulti />                  
                        </div>
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Création filière </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreationFiliere