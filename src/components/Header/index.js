import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import firebase from '../../firebase'
import IconMenu from '../IconHamburguer'

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(e) {
        e.preventDefault()
        firebase.auth().signOut();
    }

    render() {
        return (
            <header className="menu-header">
                <nav className="menu">
                    <img src="" alt="" className="menu-logo"/>
                    <ul className="menu-items">
                        <li className="menu-item"><NavLink exact to="/" className="menu-link">Inicio</NavLink></li>
                        <li className="menu-item"><NavLink exact to="/alta" className="menu-link">Alta</NavLink></li>
                        <li className="menu-item"><NavLink to="/consulta" className="menu-link">Consulta</NavLink></li>
                        {/* <li className="menu-item"><NavLink exact to="/modificacion" className="menu-link">Modificación</NavLink></li> */}
                        <li className="menu-item"><NavLink to="/salir" className="menu-link">Salir</NavLink></li>
                    </ul>
                    <div className="menu-icon">
                        <IconMenu />
                    </div>
                </nav>
             </header>
        ) 
    }
}

export default Header