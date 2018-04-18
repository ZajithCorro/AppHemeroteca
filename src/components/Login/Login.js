// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase, { auth } from '../../firebase.js'

// Assets
import './styles.css'
import users from '../img/usuarios.svg'
import libro from '../img/libro.svg'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
            formError: {
                email: '',
                password: ''
            },
            validacion: true
        }

        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
        this.keyEnter = this.keyEnter.bind(this);
    }

    
    handleInput (event) {
        let name = event.target.name;
        let value = event.target.value;
        
        this.setState({ [name] : value });
        this.validarInput(name, value)
    }

    validarInput (name, value) {
        const { formError } = this.state;
        
        switch (name) {
            case 'email':
                formError.email = (value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) ? false : true;
                break;

            case 'password':
                formError.password = (value) ? false : true;
                break;

            default:
                break;
        }

        this.activarBoton()
    }

    activarBoton () {
        let a = 0;

        for (let i in this.state.formError) {
            if (this.state.formError[i] === false) a++;
        }

        (a === 2 ) ? this.setState({ validacion: false }) : this.setState({ validacion: true });
    }
    
    keyEnter (event) {
        if (event.key === 'Enter' && this.state.validacion === false) this.login();
    }
    
    login () {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {}).catch((error) => {console.log(error)})
    }
    render() {
        return (
            <div className="fondo">
                <div className="card">
                    <div className="contenedor row">
                        <img src={users} alt="" className="img"/>
                        <div className="hide">Iconos diseñados por <a href="http://www.freepik.com" title="Freepik">Freepik</a> desde <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.com</a> con licencia <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                    </div>
                    <div className="contendor row">
                        <label className="label">Correo</label>
                        <input type="text" className="input" value={this.state.email} onChange={this.handleInput} name="email"/>
                    </div>
                    <div className="contenedor row">
                        <label className="label">Password</label>
                        <input type="password" className="input" value={this.state.password} onChange={this.handleInput} name="password" onKeyPress={this.keyEnter}/>
                    </div>

                    <div className="contenedor row-btn">
                        <button onClick={this.login} className="btn" disabled={this.state.validacion}>Iniciar sesión</button>
                    </div>
                </div>
            </div>
        ) 
  }
}

export default Login
