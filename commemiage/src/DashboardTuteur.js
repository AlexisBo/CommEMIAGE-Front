import React, { Component } from 'react';
import Select from 'react-select';
import './ressources/css/bootstrap_limitless.css';

class DashboardTuteur extends Component {

    render() {

        return (
            <div className="content">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Choix de l'année de formation</h4>
                            </div>
                            <div className="card-body form-group">                                                    
                                <div class="flex-parent">
                                    <div class="input-flex-container">
                                        <div class="input">
                                            <span data-year="2010"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2011"></span>
                                        </div>
                                        <div class="input active">
                                            <span data-year="2012"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2013"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2014"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2015"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2016"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2017"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2018"></span>
                                        </div>
                                        <div class="input">
                                            <span data-year="2019"></span>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card app">
                            <div className="card-header">
                                <h4 className="card-title">Choix modules</h4>
                            </div>
                            <div className="card-body form-group">                                                    
                                <select id="apprenant" className="form-control" name="apprenant">
                                    <option>Module 1</option>
                                    <option>Module 2</option>
                                    <option>Module 3</option>
                                    <option>Module 4</option>
                                    <option>Module 5</option>
                                </select>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Notes des apprenants</h4>
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
                                            <h6 class="mb-0">Apprenant 1</h6>
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
                                            <h6 class="mb-0">Apprenant 2</h6>
                                        </td>
                                        <td class="text-center">                                            
                                            <a href="#" class="btn bg-teal-400 rounded-round btn-icon btn-sm legitRipple">
                                                <span class="letter-icon">4</span>
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
                                            <h6 class="mb-0">Apprenant 3</h6>
                                        </td>
                                        <td class="text-center">                                            
                                            <a href="#" class="btn bg-teal-400 rounded-round btn-icon btn-sm legitRipple">
                                                <span class="letter-icon">4</span>
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
                </div>
            </div>
            
        )
    }
}

export default DashboardTuteur