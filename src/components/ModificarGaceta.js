import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import firabase from '../firebase'

class Modificar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gaceta: {},
            id: this.props.match.params.id
        }
        window.document.title = 'Hemeroteca | Modificar Gaceta'
    }

    componentDidMount() {
        (this.props.location.state) ? this.setState({ gaceta: this.props.location.state.gaceta }) : null;

        if (!this.props.location.state) {
            let aux = {}
            let { id } = this.state
            
            firabase.firestore()
                .collection('gacetas')
                .where('id', '==' , parseInt(id))
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        aux = doc.data();
                        aux.key = doc.id
                    })
                    this.setState({ gaceta: aux })
                })
                .catch(err => {
                    console.error('Error', err)
                })
        }
    }   

    render() {
        return(
            <div className="main">
                <p>{this.props.match.params.id}</p>
                <p>
                    {(this.state.gaceta) ? this.state.gaceta.key : 'Error al acceder al registro'}
                </p>
            </div>
        );
    }
}

export default Modificar