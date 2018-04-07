// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'firebase'
import './styles.css'
import { config, firestore } from './config.json'

// Components
import Header from './components/Header/Header.js'
import Alta from './components/Alta.js'
import Consulta from './components/Consulta.js'
import Modificacion from './components/Modificacion.js'
import Salir from './components/Salir.js'
import Home from './components/Home.js'

firebase.initializeApp(config);

class App extends Component {
  render() {
   return (
    <Router>
      <div>  
        <Header />

        <Route exact path="/" component={Home}/>
        <Route path="/alta" component={Alta}/>
        <Route path="/consulta" component={Consulta}/>
        <Route path="/modificacion" component={Modificacion}/>
        <Route path="/salir" component={Salir}/>
      </div>
    </Router>
   ) 
  }
}

render(<App/>, document.getElementById('app'));
