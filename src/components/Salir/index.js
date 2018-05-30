import React, { Component } from 'react';
import firebase from '../../firebase'
import { Redirect } from 'react-router'

class Salir extends Component {

    componentDidMount() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <Redirect to="/login"></Redirect>
        );
    }
}

export default Salir