// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase, { auth } from './firebase.js'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
    }

    login () {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {}).catch((error) => {console.log(error)})
    }

    handleInput (e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({ [name] : value });
    }

    render() {
        return (
            <div className="contenedor">
                <div className="contendor">
                    <label>Correo</label>
                    <input type="text" className="input" value={this.state.email} onChange={this.handleInput} name="email"/>
                </div>
                <div className="contenedor">
                    <label>Password</label>
                    <input type="password" className="input" value={this.state.password} onChange={this.handleInput} name="password"/>
                </div>

                <button onClick={this.login}>login</button>
            </div>
        ) 
  }
}

export default Login
