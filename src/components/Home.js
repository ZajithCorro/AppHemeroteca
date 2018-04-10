import React, { Component } from 'react';

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