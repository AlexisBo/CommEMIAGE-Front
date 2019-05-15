import React, { Component } from 'react';
import Select from 'react-select';
import './ressources/css/bootstrap_limitless.css';

class DashboardAdmin extends Component {

    render() {

        return (
            <div className="content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Choix apprenant</h4>
                            </div>
                            <div className="card-body form-group">                                                    
                                <select id="apprenant" className="form-control" name="apprenant">
                                    <option>Étudiant 1</option>
                                    <option>Étudiant 2</option>
                                    <option>Étudiant 3</option>
                                    <option>Étudiant 4</option>
                                    <option>Étudiant 5</option>
                                </select>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">                    
                    <div className="col-md-4">
                        <div class="card border-left-3 border-left-danger rounded-left-0">
                            <div class="card-body">
                                <div class="d-sm-flex flex-sm-nowrap">
                                    <div style={{textAlign: "left"}}>
                                        <h6 class="font-weight-semibold">Étudiant 1</h6>
                                        <ul class="list list-unstyled mb-0">
                                            <li>Formation : <span class="font-weight-semibold">eM1MIA</span></li>
                                            <li>Date début formation : <span class="font-weight-semibold">01/09/18</span></li>
                                        </ul>
                                    </div>

                                    <div class="text-sm-right mb-0 mt-3 mt-sm-0 ml-auto">
                                        <h6>Âge : <span class="font-weight-semibold">22 ans</span></h6>
                                        <ul class="list list-unstyled mb-0">
                                            <li>État : <span class="badge bg-teal-400">En cours</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Notes de l'apprenant</h4>
                            </div>
                            <div className="table-responsive">
                                <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th style={{"width": 300 + "px"}}>Modules</th>
                                        <th style={{"width": 20 + "px;"}}>Coefficient</th>
                                        <th style={{"width": 20 + "px;"}}>Note</th>                                        
                                        <th>Commentaire</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">
                                            <h6 class="mb-0">MEGL</h6>                                            
                                            <div class="font-size-sm text-muted line-height-1">COJEAN</div>
                                        </td>
                                        <td class="text-center">                                            
                                            <a href="#" class="btn bg-teal-400 rounded-round btn-icon btn-sm legitRipple">
                                                <span class="letter-icon">4</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <h6 class="mb-0">12</h6>
                                            <div class="font-size-sm text-muted line-height-1">/20</div>
                                        </td>
                                        <td class="text-center">
                                            <div class="font-weight-semibold">Lorem Ipsum</div>
                                            <span class="text-muted">Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum.</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <h6 class="mb-0">ANALDON</h6>
                                            <div class="font-size-sm text-muted line-height-1">UZARRALDE</div>
                                        </td>
                                        <td class="text-center">                                            
                                            <a href="#" class="btn bg-teal-400 rounded-round btn-icon btn-sm legitRipple">
                                                <span class="letter-icon">3</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <h6 class="mb-0">16</h6>
                                            <div class="font-size-sm text-muted line-height-1">/20</div>
                                        </td>
                                        <td class="text-center">
                                            <div class="font-weight-semibold">Lorem Ipsum</div>
                                            <span class="text-muted">Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum.</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center">
                                            <h6 class="mb-0">CRYSEC</h6>
                                            <div class="font-size-sm text-muted line-height-1">ANGEL</div>
                                        </td>
                                        <td class="text-center">                                            
                                            <a href="#" class="btn bg-teal-400 rounded-round btn-icon btn-sm legitRipple">
                                                <span class="letter-icon">3</span>
                                            </a>
                                        </td>
                                        <td class="text-center">
                                            <h6 class="mb-0">8</h6>
                                            <div class="font-size-sm text-muted line-height-1">/20</div>
                                        </td>
                                        <td class="text-center">
                                            <div class="font-weight-semibold">Lorem Ipsum</div>
                                            <span class="text-muted">Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum.</span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Commentaires</h4>
                            </div>
                            <div className="card-body">
                            <textarea rows="3" cols="3" class="form-control" placeholder="Saisissez un commentaire concernant l'apprenant"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default DashboardAdmin