// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import './styles.css'
import firebase, { auth } from './firebase.js'

// Components
import Header from './components/Header/Header.js'
import Alta from './components/Alta.js'
import Consulta from './components/Consulta.js'
import Modificacion from './components/Modificacion.js'
import Salir from './components/Salir.js'
import Home from './components/Home.js'
import ModificarGaceta from './components/ModificarGaceta.js'
import Login from './Login';

class App extends Component {
    constructor(){
        super();
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                this.setState({ user })
            } else {
                this.setState({ user: null });
            }
        })
    }

    render() {
        return (
            <div>
                <Router>
                {
                    this.state.user ?     
                            <div>  
                                <Header />

                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/alta" component={Alta}/>
                                    <Route path="/consulta" component={Consulta}/>
                                    <Route exact path="/modificacion" component={Modificacion}/>
                                    <Route path="/salir" component={Salir}/>
                                    <Route exact path="/modificacion/:id" component={ModificarGaceta}/>
                                    <Redirect to="/"/>
                                </Switch>
                            </div> : 
                            <div>
                                <Switch>
                                    <Route path="/login" component={Login} />
                                    <Redirect to="/login"/>
                                </Switch>
                            </div>
                }
                </Router>
            </div>
        ) 
    }
}

render(<App/>, document.getElementById('app'));
