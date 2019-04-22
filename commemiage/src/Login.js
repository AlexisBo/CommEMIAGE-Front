import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password : ''
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            email : this.state.email,
            password : this.state.password
        }));

        fetch('http://localhost:3010/utilisateurs/login/'+ this.state.email + "/" + this.state.password)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("login rep - data" + JSON.stringify(data));
            localStorage.setItem('user_role', data.role); 
            localStorage.setItem('user_email', data.email); 
            localStorage.setItem('user_token', data.token); 
            window.location.reload();          
        });
    }

   render() {
       return (
            <div className="ashier">  
                <div className="navbar navbar-expand-md navbar-dark bg-indigo navbar-static">
                    <div className="navbar-brand">
                    </div>

                    <div className="d-md-none">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                            <i className="icon-tree5"></i>
                        </button>
                        <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                            <i className="icon-paragraph-justify3"></i>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-mobile">
                        <ul className="navbar-nav">			</ul>

                        <span className="navbar-text ml-md-3">
                            <span className="badge badge-mark border-green-300 mr-2"></span>
                            Welcome !
                        </span>
                    </div>
                </div>
                <div className="page-content">
                    <div className="content-wrapper">
                        <div className="content d-flex justify-content-center align-items-center">
                            <form className="login-form" onSubmit={this.handleSubmit}>                                        
                                <div className="card card-body">
                                    <div class="text-center mb-3">
                                        <i class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                                        <h5 class="mb-0">Login to your account</h5>
                                        <span class="d-block text-muted">Enter your credentials below</span>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})} className="form-control" id="email" name="email" placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})} className="form-control" id="password" name="password" placeholder="Mot de passe"/>
                                    </div>
                                
                                    <div className="form-group">
                                        <button type="submit" class="btn bg-pink-400 btn-block legitRipple" style={{ marginTop: 10+'px' }}>Login </button>
                                    </div>  
                                </div>
                            </form>                                
                        </div>
                        <div class="navbar navbar-expand-lg navbar-light">
                            <div class="text-center d-lg-none w-100">
                                <button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
                                    <i class="icon-unfold mr-2"></i>
                                    Footer
                                </button>
                            </div>

                            <div class="navbar-collapse collapse" id="navbar-footer">
                                <span class="navbar-text">
                                    © 2019. <a href="#">CommEMIAGE</a> by Fakih Darkaoui et Alexis Boisne
                                </span>

                                <ul class="navbar-nav ml-lg-auto">
                                    <li class="nav-item"><a href="https://www.univ-evry.fr/accueil.html" class="navbar-nav-link legitRipple" target="_blank"><i class="icon-graduation2  mr-2"></i> Université d'Evry</a></li>                                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       )
   }
}
export default Login
