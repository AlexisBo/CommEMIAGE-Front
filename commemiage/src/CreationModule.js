import React, { Component } from 'react'

class CreationModule extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            nom: '',
            coefficient: '',
            seuil: ''
          }
      }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            nom: this.state.nom,
            coefficient: this.state.coefficient,
            seuil: this.state.seuil
          }));

          fetch('http://localhost:3010/modules/add',{
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom,
                coefficient: this.state.coefficient,
                seuil: this.state.seuil
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
            <div className="creation-module col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Création d'un module</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">

                            <label htmlFor="nom">Saisir le nom du module</label>
                            <input type="text" value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})} className="form-control" id="nom" name="nom"/>
                            
                            <label htmlFor="coefficient">Saisir le coefficient</label>
                            <input type="text" value={this.state.coefficient} onChange={(ev)=>this.setState({coefficient:ev.target.value})} className="form-control" id="coefficient" name="coefficient"/>
                            
                            <label htmlFor="seuil">Saisir seuil de rattrapage</label>
                            <input type="text" value={this.state.seuil} onChange={(ev)=>this.setState({seuil:ev.target.value})} className="form-control" id="seuil" name="seuil"/>                        
                        </div>
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Création module </button>
                        </div>
                    </form>
                </div>
            </div>
        )
            

    }
}

export default CreationModule