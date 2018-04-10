// Dependencies
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Modificacion extends Component {
    constructor() {
        super();
        this.state = {
            prueba: 1
        }
        window.document.title = 'Hemeroteca | Modificación';
    }
    render() {
        return(
            <div className="main">
                <div className="contenedor">
                    <NavLink to={`/modificacion/${this.state.prueba}`} className="btn">Modificar</NavLink>
                </div>
            </div>
        );
    }
}

export default Modificacion