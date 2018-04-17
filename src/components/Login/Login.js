// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase, { auth } from '../../firebase.js'

// Assets
import './styles.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
        this.keyEnter = this.keyEnter.bind(this);
    }

    login () {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {}).catch((error) => {console.log(error)})
    }

    handleInput (event) {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({ [name] : value });
    }

    keyEnter (event) {
        if (event.key === 'Enter') this.login();
    }

    render() {
        return (
            <div className="fondo">
                <div className="card">
                    <div className="contendor row">
                        <label className="label">Correo</label>
                        <input type="text" className="input" value={this.state.email} onChange={this.handleInput} name="email"/>
                    </div>
                    <div className="contenedor row">
                        <label className="label">Password</label>
                        <input type="password" className="input" value={this.state.password} onChange={this.handleInput} name="password" onKeyPress={this.keyEnter}/>
                    </div>

                    <div className="contenedor row-btn">
                        <button onClick={this.login} className="btn">Iniciar sesión</button>
                    </div>
                </div>
            </div>
        ) 
  }
}

export default Login
