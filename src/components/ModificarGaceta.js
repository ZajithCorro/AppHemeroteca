import React, { Component } from 'react';

class Modificar extends Component {
    constructor(props) {
        super(props);
        window.document.title = 'Hemeroteca | Modificar Gaceta'
    }
    
    render() {
        return(
            <div className="main">
                <p>{this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Modificar