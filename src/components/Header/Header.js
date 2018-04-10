// Dependencies
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Assets
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="menu-header">
                <nav className="menu">
                    <img src="" alt="" className="menu-logo"/>
                    <ul className="menu-items">
                        <li className="menu-item"><NavLink exact to="/" className="menu-link">Inicio</NavLink></li>
                        <li className="menu-item"><NavLink to="/alta" className="menu-link">Alta</NavLink></li>
                        <li className="menu-item"><NavLink to="/consulta" className="menu-link">Consulta</NavLink></li>
                        <li className="menu-item"><NavLink exact to="/modificacion" className="menu-link">Modificación</NavLink></li>
                        <li className="menu-item"><NavLink to="/salir" className="menu-link">Salir</NavLink></li>
                    </ul>
                    <img src="" alt="" className="menu-icon"/>
                </nav>
             </header>
        ) 
    }
}

export default Header