import React, { Component } from 'react'

class AttributionTuteur extends Component {

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
        return (
            <div className="attribution-tuteur col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Choix des modules par semestres</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">
                            <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="nom">Module 1</label>
                                        <input type="hidden" id="nom" name="nom" value="Module 1"/>
                                        
                                        <select className="form-control" name="tuteur">
                                            <option value="tuteur1">Tuteur 1</option>
                                            <option value="tuteur2">Tuteur 2</option>
                                            <option value="tuteur3">Tuteur 3</option>
                                            <option value="tuteur4">Tuteur 4</option>
                                        </select>

                                        <label htmlFor="nom">Module 3</label>
                                        <input type="hidden" id="nom" name="nom" value="Module 3"/>
                                        
                                        <select className="form-control" name="tuteur">
                                            <option value="tuteur1">Tuteur 1</option>
                                            <option value="tuteur2">Tuteur 2</option>
                                            <option value="tuteur3">Tuteur 3</option>
                                            <option value="tuteur4">Tuteur 4</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="nom">Module 2</label>
                                        <input type="hidden" id="nom" name="nom" value="Module 2"/>
                                        
                                        <select className="form-control" name="tuteur">
                                            <option value="tuteur1">Tuteur 1</option>
                                            <option value="tuteur2">Tuteur 2</option>
                                            <option value="tuteur3">Tuteur 3</option>
                                            <option value="tuteur4">Tuteur 4</option>
                                        </select>

                                        <label htmlFor="nom">Module 4</label>
                                        <input type="hidden" id="nom" name="nom" value="Module 4"/>
                                        
                                        <select className="form-control" name="tuteur">
                                            <option value="tuteur1">Tuteur 1</option>
                                            <option value="tuteur2">Tuteur 2</option>
                                            <option value="tuteur3">Tuteur 3</option>
                                            <option value="tuteur4">Tuteur 4</option>
                                        </select>
                                    </div>  
                            </div>
                        </div>
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