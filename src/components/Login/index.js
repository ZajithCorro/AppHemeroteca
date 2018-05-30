import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase, { auth } from '../../firebase.js'

import users from '../Img/usuarios.svg'
import { Fondo, Card, CardHead, Img, CardInput, CardBtn, MessageError } from './styles'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numTrabajador : '',
            password: '',
            formError: {
                numTrabajador: '',
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
            case 'numTrabajador':
                formError.email = (value.match(/^[0-9]{1,6}$/)) ? false : true;
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
        if (event.key === 'Enter' && this.state.validacion === false) this.login() 
    }
    
    login () {
        // Numero de trabajador
        // 170486
        firebase.firestore()
            .collection('usuarios')
            .where('numero_trabajador', '==', parseInt(this.state.numTrabajador))
            .get()
            .then(snapshot => {
                if (snapshot.docChanges.length > 0) {
                    snapshot.forEach(doc => {
                        let { tipo } = doc.data()
                        let email;
    
                        switch(tipo) {
                            case 'encargado':
                                email = 'zajithcorro@gmail.com'
                                break;
                            
                            case 'auxiliar':
                                email = 'unrealt42@gmail.com'
                                break;
    
                            default:
                                break;
                        }
    
                        firebase.auth().signInWithEmailAndPassword(email, this.state.password)
                            .then((u) => {})
                            .catch((error) => {
                                this.setState({ message: 'Usuario o contraseña incorrectas'})
                                console.log(error)
                            })
                    })
                } else {
                    this.setState({ message: 'Usuario existente'})
                }
            })
            .catch((error) => {
                console.log('Nada')
            });
    }

    render() {
        return (
            <Fondo>
                <Card>
                    <CardHead>
                        <Img src={users}/>
                    </CardHead>
                    <CardInput>
                        <label className="label">Número de trabajador</label>
                        <input type="text" className="input" value={this.state.email} onChange={this.handleInput} name="numTrabajador" autoComplete="off"/>
                    </CardInput>
                    <CardInput>
                        <label className="label">Password</label>
                        <input type="password" className="input" value={this.state.password} onChange={this.handleInput} name="password" onKeyPress={this.keyEnter}/>
                    </CardInput>
                    
                    { 
                        (this.state.message) ?
                            <MessageError>
                                <p>{this.state.message}</p>
                            </MessageError>
                        :  null
                    }

                    <CardBtn>
                        <button onClick={this.login} className="btn" disabled={this.state.validacion}>Iniciar sesión</button>
                    </CardBtn>
                </Card>
            </Fondo>
        ) 
  }
}

export default Login
