import React, { Component } from 'react'

class InscriptionApprenant extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            nom: '',
            prenom : '',
            adresse : '',
            email : ''
          }
      }
    
      handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            nom: this.state.nom,
            prenom : this.state.prenom,
            adresse : this.state.adresse,
            email : this.state.email
          }));

          fetch('http://localhost:3010/apprenants/add',{
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom,
                prenom : this.state.prenom,
                adresse : this.state.adresse,
                email : this.state.email
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
        return (
            <div className="inscription-apprenant col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Inscription de l'apprenant</h4>
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

                            <label htmlFor="filiere">Filière :</label>
                            <select className="form-control" id="filiere" name="filiere">
                                <option value="filiere1">Filière 1</option>
                                <option value="filiere2">Filière 2</option>
                                <option value="filiere3">Filière 3</option>
                            </select>
                        </div>
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>S'inscrire </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default InscriptionApprenant