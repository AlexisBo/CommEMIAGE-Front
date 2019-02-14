import React, { Component } from 'react'

class InscriptionApprenant extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log('Submited');
        
        fetch('http://localhost:3010/apprenant/add', {
          method: 'POST',
          body: data,
        });
    }  

    render() {
        return (
            <div class="inscription-apprenant col-md-6">
                <div class="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div class="panel-header">
                        <h4 class="title">Inscription de l'apprenant</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div class="panel-body">

                            <label htmlFor="nom">Nom :</label>
                            <input type="text" class="form-control" id="nom" name="nom"/>
                            
                            <label htmlFor="prenom">Prénom :</label>
                            <input type="text" class="form-control" id="prenom" name="prenom"/>
                            
                            <label htmlFor="adresse">Adresse postale :</label>
                            <input type="text" class="form-control" id="adresse" name="adresse"/>

                            <label htmlFor="mail">Adresse mail :</label>
                            <input type="text" class="form-control" id="mail" name="mail"/>

                            <label htmlFor="dateForm">Date de formation :</label>
                            <input type="text" class="form-control" id="dateForm" name="dateForm"/>

                            <label htmlFor="filiere">Filière :</label>
                            <select class="form-control" id="filiere" name="filiere">
                                <option value="filiere1">Filière 1</option>
                                <option value="filiere2">Filière 2</option>
                                <option value="filiere3">Filière 3</option>
                            </select>

                            <label htmlFor="module">Modules :</label>
                            <select multiple class="form-control" id="module" name="module">
                                <option value="module1">Module 1</option>
                                <option value="module2">Module 2</option>
                                <option value="module3">Module 3</option>
                                <option value="module4">Module 4</option>
                            </select>
                        </div>
                        <div class="panel-footer">
                            <button type="submit" class="btn btn-primary" style={{ marginTop: 10+'px' }}>S'inscrire </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default InscriptionApprenant