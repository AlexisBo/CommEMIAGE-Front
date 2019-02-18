import React, { Component } from 'react'

class CreationFiliere extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            nom: '',
            module: ''
          }
      }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit');
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            nom: this.state.nom
          }));

          fetch('http://localhost:3010/filieres/add',{
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom
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
            <div className="creation-filiere col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Création d'une filière</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">

                            <label htmlFor="nom">Saisir le nom de la filière</label>
                            <input type="text" className="form-control" value={this.state.nom} onChange={(ev)=>this.setState({nom:ev.target.value})} id="nom" name="nom"/>
                            
                            <label htmlFor="module">Modules :</label>
                            <select multiple className="form-control" id="module" name="module">
                                <option value="module1">Module 1</option>
                                <option value="module2">Module 2</option>
                                <option value="module3">Module 3</option>
                                <option value="module4">Module 4</option>
                            </select>                       
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