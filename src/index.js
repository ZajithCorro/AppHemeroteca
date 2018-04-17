// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import './styles.css'
import firebase, { auth } from './firebase.js'

// Components
import Header from './components/Header/Header'
import Alta from './components/Alta'
import Consulta from './components/Consulta'
import Modificacion from './components/Modificacion'
import Salir from './components/Salir'
import Home from './components/Home'
import ModificarGaceta from './components/ModificarGaceta'
import Login from './components/Login/Login';

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
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Redirect to="/login"/>
                            </Switch>
                }
                </Router>
            </div>
        ) 
    }
}

render(<App/>, document.getElementById('app'));
