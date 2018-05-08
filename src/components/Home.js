import React, { Component } from 'react';
import IconMenu from './Header/Hamburguer'

class Home extends Component {
    constructor() {
        super();
        window.document.title = 'Hemeroteca | Home'
    }
    render() {
        return(
            <div className="main">
                <p>Home</p>
            </div>
        );
    }
}

export default Home