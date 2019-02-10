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
        
        fetch('localhost:3010/apprenant/add', {
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

                            <label htmlFor="nom">Saisir le nom du module</label>
                            <input type="text" class="form-control" id="nom" name="nom"/>
                            
                            <label htmlFor="coefficient">Saisir le coefficient</label>
                            <input type="text" class="form-control" id="coefficient" name="coefficient"/>
                            
                            <label htmlFor="seuil">Saisir seuil de rattrapage</label>
                            <input type="text" class="form-control" id="seuil" name="seuil"/>                        
                        </div>
                        <div class="panel-footer">
                            <button type="submit" class="btn btn-primary" style={{ marginTop: 10+'px' }}>Création module </button>
                        </div>
                    </form>
                </div>
            </div>
        )
            

    }
}

export default InscriptionApprenant