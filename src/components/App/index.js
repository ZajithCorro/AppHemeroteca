import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import './styles.css'
import firebase, { auth } from '../../firebase'

import Header from '../Header'
import Alta from '../Alta'
import Consulta from '../Consulta'
import Salir from '../Salir'
import Home from '../Home'
import Login from '../Login';

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
                                    {/* <Route exact path="/modificacion" component={Modificacion}/> */}
                                    <Route path="/salir" component={Salir}/>
                                    {/* <Route exact path="/modificacion/:id" component={ModificarGaceta}/> */}
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

export default App;