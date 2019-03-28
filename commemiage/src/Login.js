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
            <div className="login col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4 className="title">Connexion</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-body">
                            <label htmlFor="mail">Adresse mail :</label>
                            <input type="text" value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})} className="form-control" id="email" name="email"/>
                            
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})} className="form-control" id="password" name="password"/>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Login </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login