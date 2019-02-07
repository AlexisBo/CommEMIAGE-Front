import React, { Component } from 'react'

class CreationModule extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('localhost:3010/modules/add', {
          method: 'POST',
          body: data,
        });
    }  

  render() {
    return (
        <div class="creation-module col-md-6">
            <div class="panel panel-default">
                <div class="panel-header">
                    <h4 class="title">Création d'un module</h4>
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
                        <button type="submit" class="btn btn-primary"> Création module </button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}

export default CreationModule