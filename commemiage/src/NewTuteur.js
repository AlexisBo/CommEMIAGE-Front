import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

class NewTuteur extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            nom: '',
            prenom : '',
            adresse : '',
            email : '',
            password : '',
            confPassword : '',
            module : [],
            moduleGet : []
        }
    }

    componentDidMount() {
        console.log('componentDidMount - New Tuteur');
        let currentComponent = this;
        
        fetch('http://localhost:3010/modules/')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("data get: "+ data);
            var list = [];
            data.forEach(function(module) {
                console.log(module);
                list.push({label:module.nom,value:module._id})
            });
            
            currentComponent.setState({moduleGet : list});
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let currentComponent = this;

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            nom: this.state.nom,
            prenom : this.state.prenom,
            adresse : this.state.adresse,
            email : this.state.email,
            module : this.state.module
        }));

        if(this.state.password === this.state.confPassword){

            fetch('http://localhost:3010/tuteurs/add',{
                method: 'POST',
                body: JSON.stringify({
                    nom: this.state.nom,
                    prenom : this.state.prenom,
                    adresse : this.state.adresse,
                    email : this.state.email,
                    module : this.state.module
            }),
            headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                console.log(response => response.json());
                return response => response.json()
            }).then(function(body){
                console.log(body);
                fetch('http://localhost:3010/utilisateurs/add',{
                method: 'POST',
                body: JSON.stringify({
                    role: "Tuteur",
                    email : currentComponent.state.email,
                    password : currentComponent.state.password
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
    }

    handleChange = (module) => {
        var list = [];
        module.forEach(function(module) {
            console.log("tuteur module:" + JSON.stringify(module));
            list.push({moduleId:module.value, nom:module.label});
          });
        this.setState({ module:list });
    }

    render() {
        const { module } = this.state.module;

        return (
            <div className="inscription-apprenant col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Création tuteur</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">

                            <label htmlFor="nom">Nom :</label>
                            <input type="text" value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})} className="form-control" id="nom" name="nom"/>
                            
                            <label htmlFor="prenom">Prénom :</label>
                            <input type="text" value={this.state.prenom} onChange={(ev)=>this.setState({prenom:ev.target.value})} className="form-control" id="prenom" name="prenom"/>
                            
                            <label htmlFor="adresse">Adresse postale :</label>
                            <input type="text" value={this.state.adresse} onChange={(ev)=>this.setState({adresse:ev.target.value})} className="form-control" id="adresse" name="adresse"/>

                            <label htmlFor="mail">Adresse mail :</label>
                            <input type="text" value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})} className="form-control" id="email" name="email"/>
                            
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})} className="form-control" id="password" name="password"/>

                            <label htmlFor="confPassword">Confirmation du mot de passe :</label>
                            <input type="password" value={this.state.confPassword} onChange={(ev)=>this.setState({confPassword:ev.target.value})} className="form-control" id="confPassword" name="confPassword"/>

                            <label htmlFor="module">Modules :</label>
                            <Select id="module" name="module" options={ this.state.moduleGet } value={module} onChange={this.handleChange} isMulti />
                        </div>
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Créer </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewTuteur