import React, { Component } from 'react'

class ChoixModuleSemestre extends Component {

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
            module: this.state.module
          }));

          fetch('http://localhost:3010/semestres/add',{
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom,
                coefficient: this.state.module,
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
            <div className="choix-module col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Choix des modules par semestres</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">
                            <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="nom">2019 : Semestre 1</label>
                                        <input type="hidden" id="nom" name="nom" value="2019Semestre 1"/>
                                        
                                        <select multiple className="form-control" id="module" name="module">
                                            <option value="module1">Module 1</option>
                                            <option value="module2">Module 2</option>
                                            <option value="module3">Module 3</option>
                                            <option value="module4">Module 4</option>
                                        </select>

                                        <label htmlFor="nom">2020 : Semestre 1</label>
                                        <input type="hidden" id="nom" name="nom" value="2020Semestre 1"/>
                                        
                                        <select multiple className="form-control" id="module" name="module">
                                            <option value="module1">Module 1</option>
                                            <option value="module2">Module 2</option>
                                            <option value="module3">Module 3</option>
                                            <option value="module4">Module 4</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="nom">2019 : Semestre 2</label>
                                        <input type="hidden" id="nom" name="nom" value="2019Semestre 2"/>
                                        
                                        <select multiple className="form-control" id="module" name="module">
                                            <option value="module1">Module 1</option>
                                            <option value="module2">Module 2</option>
                                            <option value="module3">Module 3</option>
                                            <option value="module4">Module 4</option>
                                        </select>

                                        <label htmlFor="nom">2020 : Semestre 2</label>
                                        <input type="hidden" id="nom" name="nom" value="2020Semestre 2"/>
                                        
                                        <select multiple className="form-control" id="module" name="module">
                                            <option value="module1">Module 1</option>
                                            <option value="module2">Module 2</option>
                                            <option value="module3">Module 3</option>
                                            <option value="module4">Module 4</option>
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

export default ChoixModuleSemestre