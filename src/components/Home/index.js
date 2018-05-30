import React, { Component } from 'react'
import Table from '../Table'
import firebase from '../../firebase'

class Home extends Component {
    constructor() {
        super();
        this.state = { gacetas: null }
    }

    componentDidMount() {
        let docs = [];

        firebase.firestore()
            .collection('gacetas')
            .orderBy('folio', 'desc')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    docs.push(doc.data())
                })
                this.setState({ gacetas: docs })
            })
            .catch(err => {
                console.error('Error: ', err)
            });
    }

    render() {
        return(
            <div className="main">
                {
                    (this.state.gacetas) ?
                        <Table 
                            data={ this.state.gacetas }
                            seeModal={ null }
                        />
                    : null
                }
            </div>
        );
    }
}

export default Home