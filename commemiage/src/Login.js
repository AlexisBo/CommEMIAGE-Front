import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password : ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount : '+ this.props.token);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        console.log('check data',this.state);
        console.log('check data json',JSON.stringify({
            email : this.state.email,
            password : this.state.password
        }));

        fetch('http://localhost:3010/utilisateurs/login',{
            method: 'POST',
            body: JSON.stringify({
                email : this.state.email,
                password : this.state.password
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
            <div className="login col-md-6">
                <div className="panel panel-default" style={{ border: "1px solid grey", padding: 10 + 'px'}}>
                    <div className="panel-header">
                        <h4 className="title">Connexion</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="panel-body">
                            <label htmlFor="mail">Adresse mail :</label>
                            <input type="text" value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})} className="form-control" id="email" name="email"/>
                            
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})} className="form-control" id="password" name="password"/>
                        </div>
                        <div className="panel-footer">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: 10+'px' }}>Login </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login