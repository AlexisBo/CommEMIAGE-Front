import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

class SuiviTuteur extends Component {
    
    render(){
        return (
            /*<div className="choix-etudiant col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Selectionnez un apprenant</h4>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-6">
                                <select className="form-control">
                                    <option value="Apprenant1">Apprenant 1</option>
                                    <option value="Apprenant2">Apprenant 2</option>
                                    <option value="Apprenant3">Apprenant 3</option>
                                </select>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>*/
            
            <div className="suivi-tuteur col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Fiche de suivi</h4>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Nom de l'apprenant</h5>
                                <h5>Nom du module</h5>
                            </div>
                            <div className="col-md-6">
                                <h5>Nom du tuteur</h5>
                            </div>   
                        </div>

                        <hr></hr>

                        <div className="row">
                            <h4 style={{marginLeft: 286 + 'px'}}>Synthèse tutorat</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Liste des questions concernant le module</h5>
                                <textarea id="questions" className="form-control" rows="5" cols="33">
                                </textarea>
                                <button id="addQuestion" className="btn btn-primary" 
                                    style={{float: 'left', marginTop: 10 +'px'}}>
                                    Ajouter
                                </button>
                            </div>  
                        </div>

                        <hr></hr>

                        <div className="row">
                            <h4 style={{marginLeft: 286 + 'px'}}>Synthèse générale</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Remarques et suggestions</h5>
                                <textarea id="questions" className="form-control" rows="5" cols="33">
                                </textarea>
                                <button id="addRemarque" className="btn btn-primary" 
                                    style={{float: 'left', marginTop: 10 +'px'}}>
                                    Ajouter
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SuiviTuteur