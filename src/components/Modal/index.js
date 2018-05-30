import React, { Component } from 'react'
import PropTypes from 'prop-types'

import firebase from '../../firebase'
import { Wrapper, Content } from './styles'

const Modal = ({ hideModal, data }) => (
    <Wrapper>
        <Content>
            <button onClick={() => hideModal(null)}>Hide</button>
            <p>{ data.nombre_entrega }</p>
        </Content>
    </Wrapper>
)

Modal.propTypes = {
    hideModal: PropTypes.func.isRequired,
    data: PropTypes.object
} 


export default Modal;
