import React, { Component } from 'react'
import Table from '../Table'
import firebase from '../../firebase'

import Modal from '../Modal'

class Home extends Component {
    constructor() {
        super();
        this.state = { gacetas: null }
    }

    hide() {

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
                {/* <Modal hideModal = {this.hide.bind(this)}/> */}
            </div>
        );
    }
}

export default Home